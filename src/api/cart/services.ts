import { ApiResponse } from "@/shared/types";
import { CartInputType } from "./types";
import axios from "@/configs/axios";

const baseUrl = '/Cart';

const addToCart = async (item: CartInputType[]): Promise<ApiResponse<CartInputType[]>> => {
    const response = await axios.post<ApiResponse<CartInputType[]>>(`${baseUrl}/AddToCart`, item)

    return response.data
}

export default { addToCart }