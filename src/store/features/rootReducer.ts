import { combineReducers } from "@reduxjs/toolkit";
import LoaderSlice from "./loaderSlice";
import CartSlice from "./cartSlice";

export const rootReducer
    = combineReducers({
    loader: LoaderSlice,
    cart: CartSlice
})