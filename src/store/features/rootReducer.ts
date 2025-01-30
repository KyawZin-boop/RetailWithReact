import { combineReducers } from "@reduxjs/toolkit";
import LoaderSlice from "./loaderSlice";
import CartSlice from "./cartSlice";
import DialogSlice from "./dialogSlice";

export const rootReducer
    = combineReducers({
    loader: LoaderSlice,
    dialog: DialogSlice,
    cart: CartSlice
})