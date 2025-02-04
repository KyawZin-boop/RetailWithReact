import api from "@/api/index";
import { DataTable } from "./chunks/ProductTable";
import { ProductDialog } from "@/components/dialogs";
import { columns } from "./chunks/columns";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store";
import { openDialog } from "@/store/features/dialogSlice";
import ProductAlertDialog from "@/components/dialogs/ProductAlertDialog";

const ProductView = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: page,
    limit: 10,
  });

  const changePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    setPagination({ page: page, limit: 10 });
  }, [page]);

  const { data: product } =
    api.product.getProductWithPagination.useQuery(pagination);

  const table = useMemo(
    () => (
      <DataTable
        columns={columns}
        data={product?.items}
        page={page}
        changePage={changePage}
        pageSize={10}
        totalProduct={product?.totalCount}
      />
    ),
    [product, page]
  );

  return (
    <>
      <div className="container pt-5 pb-4 px-10">
        <h1 className="text-center mb-5 text-2xl text-orange-500 font-bold drop-shadow-xl">
          INSTOCK PRODUCTS
        </h1>
        <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => dispatch(openDialog())}>
          Add Product
        </Button>
      </div>
      <div className="px-10">{table}</div>
      <ProductDialog />
      <ProductAlertDialog  isDelete={true}/>
    </>
  );
};

export default ProductView;
