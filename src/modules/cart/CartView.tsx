import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { increaseItem, reduceItem, removeFromCart } from "@/store/features/cartSlice";
import { MinusIcon, PlusIcon, ShoppingBagIcon } from "lucide-react";
import { useEffect, useState } from "react";

const CartView= () => {
    const CartItems = useAppSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useAppDispatch();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setTotalPrice(CartItems.reduce((total, item) => total + item.price * item.quantity, 0));
        console.log(totalPrice);
    }, [CartItems]);
    return (
        <div>
        <main className="w-full p-10 pt-5">
            <h1 className="text-3xl text-cyan-500 font-semibold text-center">Your Cart
                <ShoppingBagIcon className="inline ms-2 text-5xl" />
            </h1>
            {CartItems.length === 0 ? (<div className="h-96 flex items-center justify-center">
                <h2 className="text-4xl text-red-500 font-semibold text-center mt-5">There's no Item in Cart Yet!</h2>
            </div>):(<div>
                <Table className="mt-5 border">
                    <TableHeader>
                        <TableRow className="bg-green-400 hover:bg-green-500 text-lg ">
                            <TableHead className="w-[100px] font-bold text-gray-600 text-center">No.</TableHead>
                            <TableHead className="font-bold text-gray-600 text-center">Code</TableHead>
                            <TableHead className="font-bold text-gray-600 text-center">Name</TableHead>
                            <TableHead className="font-bold text-gray-600 text-center">Quantity</TableHead>
                            <TableHead className="font-bold text-gray-600 text-center">Price</TableHead>
                            <TableHead className="font-bold text-gray-600 text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {CartItems.map((item, index) => (<TableRow key="index + 1">
                            <TableCell className="text-center">{ index + 1 }</TableCell>
                            <TableCell className="text-center">{ item.productCode }</TableCell>
                            <TableCell className="text-center">{ item.name }</TableCell>
                            <TableCell className="text-center">
                                <div className="flex justify-evenly items-center">
                                    <span
                                        className=" rounded-full px-2 font-semibold text-red-600 cursor-pointer hover:bg-gray-200 select-none"
                                        onClick={() => dispatch(reduceItem(item.id))}>
                                        <MinusIcon />
                                    </span>
                                    <span className="w-[30px]">{ item.quantity }</span>
                                    <span
                                        className="rounded-full align-middle px-2 font-semibold text-green-600 cursor-pointer hover:bg-gray-200 select-none"
                                    onClick={() => dispatch(increaseItem(item))}>
                                        <PlusIcon />
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">$ {item.price }</TableCell>
                            <TableCell className="flex gap-2 text-white justify-center">
                                <button className="bg-red-500 rounded-md p-2 px-4"
                                    onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
                <div className="flex justify-end my-5">
                    <h1 className="text-2xl font-semibold text-blue-600">Total Price:<span className="text-gray-700">
                         $ { totalPrice }</span></h1>
                </div>
                <div className="flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-600" >Checkout</Button>
                </div>
            </div>)}
            
            
        </main>
        </div>
    );
}

export default CartView;