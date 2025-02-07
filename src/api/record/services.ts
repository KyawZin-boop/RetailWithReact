import { ApiResponse, PaginatedType } from "@/shared/types";
import { ReportDateType, SaleReportType, TotalSaleCount, TotalSummaryType } from "./types";
import axios from "../../configs/axios";

const baseUrl = '/Manager'

const getSaleReport = async (): Promise<ApiResponse<SaleReportType[]>> => {
    const response = await axios.get<ApiResponse<SaleReportType[]>>(`${baseUrl}/GetSaleReport`)
    
    return response.data;
}

const getTotalSummary = async (): Promise<ApiResponse<TotalSummaryType>> => {
    const response = await axios.get<ApiResponse<TotalSummaryType>>(`${baseUrl}/GetTotalSummary`)
    
    return response.data;
}

const getSaleReportWithinDate = async (date: ReportDateType): Promise<ApiResponse<SaleReportType[]>> => {
    const response = await axios.post<ApiResponse<SaleReportType[]>>(`${baseUrl}/GetSaleReportWithinRange`, date)
    
    return response.data;
}

const getSaleReportWithPagination = async (page: number, pageSize: number): Promise<ApiResponse<PaginatedType>> => {
    const response = await axios.get<ApiResponse<PaginatedType>>(`${baseUrl}/GetSaleRecordWithPagination?page=${page}&pageSize=${pageSize}`)
    
    return response.data;
}

const getSaleReportBySearch = async (date: string): Promise<ApiResponse<PaginatedType>> => {
    const response = await axios.get<ApiResponse<PaginatedType>>(`${baseUrl}/GetSaleReportBySearch?date=${date}`)
    
    return response.data;
}

const getTotalSaleCountForEachProduct = async (): Promise<ApiResponse<TotalSaleCount[]>> => {
    const response = await axios.get<ApiResponse<TotalSaleCount[]>>(`${baseUrl}/GetTotalSaleCountForEachProduct`)

    return response.data;
}

const getSaleReportByDate = async (date: string): Promise<ApiResponse<TotalSaleCount[]>> => {
    const response = await axios.get<ApiResponse<TotalSaleCount[]>>(`${baseUrl}/GetTotalSaleCountByDay?date=${date}`)
    
    return response.data;
}

export default { getSaleReport, getTotalSummary, getSaleReportWithinDate, getSaleReportWithPagination, getSaleReportBySearch, getTotalSaleCountForEachProduct, getSaleReportByDate }