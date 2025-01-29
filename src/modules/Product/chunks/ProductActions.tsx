import { ProductType } from "@/api/product/types"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"
import { addToCart, reduceItem } from "@/store/features/cartSlice"
import { RootState, useAppDispatch, useAppSelector } from "@/store"

const ProductActions = ({product}: {product: ProductType}) => {

  
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  return (
    <>
    <div className="flex justify-evenly">
      {!cartItems.find((item) => item.id === product.id) ? (<Button className="bg-blue-500 hover:bg-blue-600 rounded-md p-2 px-4"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
        </Button>)
      :
      (<div className="flex justify-evenly items-center">
        <span
          className=" rounded-full px-2 font-semibold text-red-600 cursor-pointer hover:bg-gray-200 select-none"
          onClick={() => dispatch(reduceItem(product.id))}
        >
          <MinusIcon />
        </span>
        <span className="w-[30px] text-black text-center">{cartItems.find((item) => item.id === product.id)?.quantity}</span>
        <span
          className="rounded-full align-middle px-2 font-semibold text-green-600 cursor-pointer hover:bg-gray-200 select-none"
          onClick={() => dispatch(addToCart(product))}
        >
          <PlusIcon />
        </span>
      </div>)
      }
      <div>
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 rounded-md p-2 px-4 me-2"
          // onClick="openEditDialog(props.product)"
        >
          Edit
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600 rounded-md p-2 px-4"
          // onClick="openDeleteDialog(props.product.id)"
        >
          Delete
        </Button>
      </div>
    </div>
  </>
  )
}

export default ProductActions
