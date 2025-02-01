import { ProductType } from "@/api/product/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
    isAlertOpen: boolean;
    isOpen: boolean;
    isEdit: boolean;
    editProduct: ProductType | null;
    deleteProduct: ProductType | null;
}

const initialState: DialogState = {
    isAlertOpen: false,
    isOpen: false,
    isEdit: false,
    editProduct: null,
    deleteProduct: null,
};

export const DialogSlice = createSlice({
    name: "Dialog",
    initialState,
    reducers: {
        openDialog: (state) => {
            state.isOpen = true;
            state.isEdit = false;
        },
        closeDialog: (state) => {
            state.isOpen = false;
            state.isAlertOpen = false;
            state.editProduct = null;
        },
        openEditDialog: (state, action: PayloadAction<ProductType>) => {
            state.isOpen = true;
            state.isEdit = true;
            state.editProduct = action.payload;
        },
        openAlertDialog: (state, action: PayloadAction<ProductType | null>) => {
            state.isAlertOpen = true;
            state.deleteProduct = action.payload;
        }
    },
});

export const { openDialog, closeDialog, openEditDialog, openAlertDialog } = DialogSlice.actions;
export default DialogSlice.reducer;