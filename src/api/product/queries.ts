import {  useMutation, QueriesOptions, useQuery, type UseMutationOptions, UseQueryOptions } from "@tanstack/react-query"
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
        return useMutation({
            mutationKey: ['addProduct'],
            mutationFn: (product: ProductInputType) => productServices.addProduct(product),
            ...opt
        })
    }
}

export const UpdateProduct = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, ProductInputType, unknown>) => {
        return useMutation({
            mutationKey: ['updateProduct'],
            mutationFn: (product: ProductInputType) => productServices.updateProduct(product),
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
    useQuery: (pagination: { page: number; limit: number }, opt?: UseQueryOptions<PaginatedType, Error>) =>
        useQuery<PaginatedType, Error>({
            queryKey: ["getProductWithPagination", pagination.page, pagination.limit],
            queryFn: async () => {
                const res = await productServices.getProductWithPagination(
                    pagination.page,
                    pagination.limit
                )

                return res.data
            },
            ...opt
        })
}

export const getProductBySearch = {
    useMutation: (opt?: UseMutationOptions<ApiResponse<PaginatedType>, Error, string, unknown>) => {
        return useMutation({
            mutationKey: ['searchProduct'],
            mutationFn: (text: string) => productServices.getProductBySearch(text),
            ...opt
        })
    }
}