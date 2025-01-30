import { CartType } from "@/api/cart/types"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<CartType>[] = [
  {
    accessorKey: "No",
    header: () => <div className="text-center">No.</div>,
    cell: ({ row }) => {
      const id = Number.parseInt(row.id) + 1
 
      return <div className="text-center font-medium">{id}</div>
    },
  },
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
    accessorKey: "quantity",
    header: () => <div className="text-center">Quantity</div>,
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as string
 
      return <div className="text-center font-medium">{quantity}</div>
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
]
