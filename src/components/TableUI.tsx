import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
  data,
  page,
  changePage,
  pageSize,
  totalProduct,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalPage = Math.ceil(totalProduct! / pageSize);

  return (
    <div>
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
                        {row.index + 1 + (page - 1) * 10}
                        {/* {(row.index + 1) + (page - 1) * 10} */}
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
                <PaginationLink onClick={() => changePage(1)}>1</PaginationLink>
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
      </div>
    </div>
  );
}
