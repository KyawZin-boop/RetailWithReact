import api from "@/api/index";
import { DataTable } from "./chunks/RecordTable";
import { columns } from "./chunks/columns";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setQueryKey({ key: "getSaleReportWithPagination", page: page, limit: 10 });
  }, [page]);

  const { data: record } = api.record.getSaleReportWithPagination.useQuery(queryKey);
  const { data: total } = api.record.fetchTotalSummary.useQuery();

  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-center mb-10 text-3xl text-blue-600 font-bold drop-shadow-xl">
          Sale Records
        </h1>
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center justify-center bg-lime-500 text-white md:w-40 p-3 px-7 rounded-lg shadow-sm">
            <p className="text-blue-900 font-semibold">Total Revenue</p>
            <span className="text-blue-700 font-semibold">{total?.totalRevenue ? (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total!.totalRevenue)) : "0"}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-lime-500  text-white md:w-40 p-3 px-7 rounded-lg shadow-sm">
            <p className="text-blue-900 font-semibold">Total Profit</p>
            <span className="text-blue-700 font-semibold">{total?.totalProfit ? (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total!.totalProfit)) : "0"}</span>
          </div>  
        </div>
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
