import api from "@/api/index";
import { DataTable } from "../../components/TableUI";
import { ProductDialog } from "@/components/dialogs";
import { columns } from "./chunks/columns";
import { useEffect, useState } from "react";

const ProductView = () => {

  const [page, setPage] = useState(1);
  const [queryKey, setQueryKey] = useState({key:'getProductWithPagination', page: page, limit: 10});

  const changePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    setQueryKey({key:'getProductWithPagination', page: page, limit: 10});
  }, [page]);

  const { data: product } = api.product.getProductWithPagination.useQuery(queryKey);

  return (
    <>
        <div className="container mx-auto p-5">
          <h1 className="text-center mb-5 text-2xl text-blue-600 font-bold">Instock Products</h1>
          <DataTable columns={columns} data={product?.items} page={page} changePage={changePage} pageSize={10} totalProduct={product?.totalCount}/>
        </div>
        <ProductDialog/>
    </>
  );
};

export default ProductView;