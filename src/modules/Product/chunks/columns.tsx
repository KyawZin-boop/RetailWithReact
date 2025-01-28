import { ProductType } from "@/api/product/types"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "productCode",
    header: () => <div className="text-center">Product Code</div>,
    cell: ({ row }) => {
      const code = row.getValue("productCode") as string
 
      return <div className="text-center font-medium">{code}</div>
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">Product Name</div>,
    cell: ({ row }) => {
      const name = row.getValue("name") as string
 
      return <div className="text-center font-medium">{name}</div>
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-center">Stock</div>,
    cell: ({ row }) => {
      const stock = row.getValue("stock") as string
 
      return <div className="text-center font-medium">{stock}</div>
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Price</div>,
    cell: ({ row }) => {
      const price = row.getValue("price") as string
 
      return <div className="text-center font-medium">{price}</div>
    },
  },
  {
    accessorKey: "profitPerItem",
    header: () => <div className="text-center">Profite Per Item</div>,
    cell: ({ row }) => {
      const profit = row.getValue("profitPerItem") as string
 
      return <div className="text-center font-medium">{profit}</div>
    },
  },
  {
    accessorKey: "createdDate",
    header: () => <div className="text-center">Created Datae</div>,
    cell: ({ row }) => {
      const date = row.getValue("createdDate") as string
 
      return <div className="text-center font-medium">{date}</div>
    },
  },
]
