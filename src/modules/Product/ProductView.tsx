import { fetchProducts } from "@/api/product/queries";
import { DataTable } from "./chunks/ProductTable";
import { columns } from "./chunks/columns";

const ProductView = () => {
  const { data: product } = fetchProducts.useQuery();

  return (
    <>
        <div className="container mx-auto p-5">
          <h1 className="text-center mb-5 text-2xl text-blue-600 font-bold">Instock Products</h1>
          <DataTable columns={columns} data={product} />
        </div>
    </>
  );
};

export default ProductView;
