import api from "@/api/index";
import { DataTable } from "./chunks/RecordTable";
import { columns } from "./chunks/columns";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from 'xlsx';

const ProductView = () => {
  const [page, setPage] = useState(1);
  const [queryKey, setQueryKey] = useState({
    key: "getSaleReportWithPagination",
    page: page,
    limit: 10,
  });

  const changePage = (page: number) => {
    setPage(page);
  };

  const {data: allRecord} = api.record.fetchSaleReport.useQuery();
    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(allRecord!);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `export_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`);
    };

  useEffect(() => {
    setQueryKey({ key: "getSaleReportWithPagination", page: page, limit: 10 });
  }, [page]);

  const { data: record } =
    api.record.getSaleReportWithPagination.useQuery(queryKey);

  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-center mb-10 text-2xl text-blue-600 font-bold drop-shadow-xl">
          Sale Records
        </h1>
        <Button
          className="bg-green-600 hover:bg-green-700 "
          onClick={handleExport}
        >
          Export as Excel
        </Button>
        <DataTable
          columns={columns}
          data={record?.items}
          page={page}
          changePage={changePage}
          pageSize={10}
          totalProduct={record?.totalCount}
        />
      </div>
    </>
  );
};

export default ProductView;
