import { ProductType } from "@/api/product/types"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<ProductType>[] = [
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
    accessorKey: "sellingPrice",
    header: () => <div className="text-center">Selling Price</div>,
    cell: ({ row }) => {
      const sellingPrice = row.getValue("sellingPrice") as string
 
      return <div className="text-center font-medium">{sellingPrice}</div>
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
    accessorKey: "totalProfit",
    header: () => <div className="text-center">Total Profit</div>,
    cell: ({ row }) => {
      const profit = row.getValue("totalProfit") as string
 
      return <div className="text-center font-medium">{profit}</div>
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-center">Total Price</div>,
    cell: ({ row }) => {
      const price = row.getValue("totalPrice") as string
 
      return <div className="text-center font-medium">{price}</div>
    },
  },
  {
    accessorKey: "saleDate",
    header: () => <div className="text-center">Sale Datae</div>,
    cell: ({ row }) => {
      const date = (row.getValue('saleDate') as string).split('T')[0]
 
      return <div className="text-center font-medium">{date}</div>
    },
  },
]
