import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import api from "@/api";
import { useEffect, useState } from "react";
import { ApiResponse, PaginatedType } from "@/shared/types";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  page: number;
  changePage: (page: number) => void;
  pageSize: number;
  totalProduct: number | undefined;
}

export function DataTable<TData, TValue>({
  columns,
  data: initialData,
  page,
  changePage,
  pageSize,
  totalProduct,
}: DataTableProps<TData, TValue>) {
  const [filteredData, setFilteredData] = useState<TData[]>(initialData || []);

  const table = useReactTable({
    data: filteredData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { mutate: getProductBySearch } =
    api.product.getProductBySearch.useMutation({
      onSuccess: (result: ApiResponse<PaginatedType>) => {
        setFilteredData(result.data.items as TData[]);
        setShowPagination(false);
      },
    });

  const [showPagination, setShowPagination] = useState(true);

  const [search, setSearch] = useState("");

  const totalPage = Math.ceil(totalProduct! / pageSize);

  useEffect(() => {
    if (search) {
      getProductBySearch(search);
    } else {
      setFilteredData(initialData || []);
      setShowPagination(true);
    }
  }, [search, getProductBySearch, initialData]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Product by Name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-blue-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) =>
                    cell.column.id === "No" ? (
                      <TableCell key={cell.id} className="text-center">
                        {search ? row.index + 1 : (row.index + 1 + (page - 1) * 10)}
                      </TableCell>
                    ) : (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {showPagination ? (
          <Pagination>
            <PaginationContent>
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (page > 1) changePage(page - 1);
                  }}
                  className={page === 1 ? "disabled" : ""} // Disable if on the first page
                />
              </PaginationItem>

              {/* First Page */}
              {page > 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => changePage(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Ellipsis before current page */}
              {page > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Current Page and Surrounding Pages */}
              {Array.from({ length: totalPage }, (_, i) => {
                const pageNumber = i + 1;

                if (pageNumber >= page - 1 && pageNumber <= page + 2) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => changePage(pageNumber)}
                        isActive={pageNumber === page}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return null;
              }).filter(Boolean)}

              {/* Ellipsis after current page */}
              {page < totalPage - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Last Page */}
              {page < totalPage - 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => changePage(totalPage)}>
                    {totalPage}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (page < totalPage) changePage(page + 1);
                  }}
                  className={page === totalPage ? "disabled" : ""} // Disable if on the last page
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : (
            <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
