import {  useMutation, QueriesOptions, useQuery, useQueryClient, type UseMutationOptions, UseQueryOptions } from "@tanstack/react-query"
import { ProductInputType, ProductType } from "./types"
import { ApiResponse, PaginatedType,  } from "@/shared/types"
import productServices from "./services"

export const fetchProducts = {
    useQuery: (opt?: QueriesOptions<ProductType[]>) =>
        useQuery<ProductType[], Error>({
            queryKey: ['getAllProducts'],
            queryFn: async () => {
                const response: ApiResponse<ProductType[]> = await productServices.getAllProducts();

                return response.data;
            },
            ...opt
        })
}

export const AddProduct = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, ProductInputType, unknown>) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['addProduct'],
            mutationFn: (product: ProductInputType) => productServices.addProduct(product),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAllProducts']});
            },
            ...opt
        })
    }
}

export const UpdateProduct = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, ProductInputType, unknown>) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['updateProduct'],
            mutationFn: (product: ProductInputType) => productServices.updateProduct(product),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAllProducts']});
            },
            ...opt
        })
    }
}

export const DeleteProduct = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, string, unknown>) => {
        return useMutation({
            mutationKey: ['deleteProduct'],
            mutationFn: (id: string) => productServices.deleteProduct(id),
            ...opt
        })
    }
}

export const getProductWithPagination = {
    useQuery: (queryKey: { key: string; page: number; limit: number }, opt?: UseQueryOptions<PaginatedType, Error>) =>
        useQuery<PaginatedType, Error>({
            queryKey: [queryKey.key, queryKey.page, queryKey.limit],
            queryFn: async () => {
                const res = await productServices.getProductWithPagination(
                    queryKey.page,
                    queryKey.limit
                )

                return res.data
            },
            ...opt
        })
}