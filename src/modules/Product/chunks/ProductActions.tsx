import { ProductType } from "@/api/product/types"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"
import { addToCart, reduceItem } from "@/store/features/cartSlice"
import { RootState, useAppDispatch, useAppSelector } from "@/store"
import { CartType } from "@/api/cart/types"
import { openAlertDialog, openEditDialog } from "@/store/features/dialogSlice"

const ProductActions = ({product}: {product: ProductType}) => {

  
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  return (
    <>
    <div className="flex justify-evenly">
      {!cartItems.find((item: CartType) => item.id === product.id) ? (<Button className="bg-blue-600 hover:bg-blue-700 rounded-md p-2 px-4"
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
        <span className="w-[30px] text-black text-center">{cartItems.find((item: CartType) => item.id === product.id)?.quantity}</span>
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
          onClick={() => dispatch(openEditDialog(product))}
        >
          Edit
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600 rounded-md p-2 px-4"
          onClick={() => dispatch(openAlertDialog(product))}
        >
          Delete
        </Button>
      </div>
    </div>
  </>
  )
}

export default ProductActions
