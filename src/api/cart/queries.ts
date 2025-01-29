import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import cartServices from "./services";
import { CartInputType } from "./types";

export const storeCart = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, CartInputType[], unknown>) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['storeCart'],
            mutationFn: (item: CartInputType[]) => cartServices.addToCart(item),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAllProducts']});
            },
            ...opt
        })
    }
}