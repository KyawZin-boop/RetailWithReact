import api from "@/api/index";
import { DataTable } from "../../components/TableUI";
import { columns } from "./chunks/columns";
import { useEffect, useState } from "react";

const ProductView = () => {
  const [page, setPage] = useState(1);
  const [queryKey, setQueryKey] = useState({key:'getSaleReportWithPagination', page: page, limit: 10});

  const changePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    setQueryKey({key:'getSaleReportWithPagination', page: page, limit: 10});
  }, [page]);

  const { data: record } = api.record.getSaleReportWithPagination.useQuery(queryKey);

  return (
    <>
        <div className="container mx-auto p-5">
          <h1 className="text-center mb-10 text-2xl text-blue-600 font-bold drop-shadow-xl">Sale Records</h1>
          <DataTable columns={columns} data={record?.items} page={page} changePage={changePage} pageSize={10} totalProduct={record?.totalCount} />
        </div>
    </>
  );
};

export default ProductView;