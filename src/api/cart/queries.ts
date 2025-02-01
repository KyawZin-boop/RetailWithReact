import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import cartServices from "./services";
import { CartInputType } from "./types";

export const storeCart = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, CartInputType[], unknown>) => {
        return useMutation({
            mutationKey: ['storeCart'],
            mutationFn: (item: CartInputType[]) => cartServices.addToCart(item),
            ...opt
        })
    }
}