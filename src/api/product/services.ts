import { ApiResponse, PaginatedType } from "@/shared/types";
import { ProductType, ProductInputType, ProductDeleteType } from "./types"
import axios from "@/configs/axios";

const baseUrl = '/Product'

const getAllProducts = async (): Promise<ApiResponse<ProductType[]>> => {
    const response = await axios.get<ApiResponse<ProductType[]>>(`${baseUrl}/GetAllProducts`)
    
    return response.data;
}

const addProduct = async (product: ProductInputType): Promise<ApiResponse<ProductInputType>> => {
    const response = await axios.post<ApiResponse<ProductInputType>>(`${baseUrl}/AddProduct`, product);

    return response.data;
}

const updateProduct = async (product: ProductInputType): Promise<ApiResponse<ProductInputType>> => {
    const response = await axios.post<ApiResponse<ProductInputType>>(`${baseUrl}/UpdateProduct`, product);

    return response.data;
}

const deleteProduct = async (id: string): Promise<ApiResponse<ProductDeleteType>> => {
    const response = await axios.post<ApiResponse<ProductDeleteType>>(`${baseUrl}/DeleteProduct?id=${id}`);
    return response.data;
}

const getProductWithPagination = async (page: number, pageSize: number): Promise<ApiResponse<PaginatedType>> => {
    const response = await axios.get<ApiResponse<PaginatedType>>(`${baseUrl}/GetAllProductWithPagination?page=${page}&pageSize=${pageSize}`)
    
    return response.data;
}

export default { getAllProducts, addProduct, updateProduct, deleteProduct, getProductWithPagination }