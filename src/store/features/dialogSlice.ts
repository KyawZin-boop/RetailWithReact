import { ProductType } from "@/api/product/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
    isOpen: boolean;
    isEdit: boolean;
    editProduct: ProductType | null;
}

const initialState: DialogState = {
    isOpen: false,
    isEdit: false,
    editProduct: null,
};

export const DialogSlice = createSlice({
    name: "Dialog",
    initialState,
    reducers: {
        openDialog: (state) => {
            state.isOpen = true;
        },
        closeDialog: (state) => {
            state.isOpen = false;
            state.isEdit = false;
            state.editProduct = null;
        },
        openEditDialog: (state, action: PayloadAction<ProductType>) => {
            state.isOpen = true;
            state.isEdit = true;
            state.editProduct = action.payload;
        },
    },
});

export const { openDialog, closeDialog, openEditDialog } = DialogSlice.actions;
export default DialogSlice.reducer;