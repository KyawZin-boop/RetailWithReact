import { keepPreviousData, useMutation, UseMutationOptions, QueriesOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import {  ReportDateType, SaleReportType, TotalSummaryType } from "./types";
import { ApiResponse, PaginatedType } from "@/shared/types";
import saleServices from "./services"
export const fetchSaleReport = {
    useQuery: (opt?: QueriesOptions<SaleReportType[]>) =>
        useQuery<SaleReportType[], Error>({
            queryKey: ['getSaleReport'],
            queryFn: async () => {
                const response: ApiResponse<SaleReportType[]> = await saleServices.getSaleReport();

                return response.data;
            },
            ...opt
        })
}

export const fetchTotalSummary = {
    useQuery: (opt?: TotalSummaryType) =>
        useQuery<TotalSummaryType, Error>({
            queryKey: ['getTotalSummary'],
            queryFn: async () => {
                const response: ApiResponse<TotalSummaryType> = await saleServices.getTotalSummary();

                return response.data;
            },
            ...opt
        })
}

export const getSaleReportWithinDate = {
        useMutation: (opt?: UseMutationOptions<unknown, Error, ReportDateType, unknown>) => {
            const queryClient = useQueryClient();
            return useMutation({
                mutationKey: ['getReportWithinDate'],
                mutationFn: (date: ReportDateType) => saleServices.getSaleReportWithinDate(date),
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['getAllProducts']});
                },
                ...opt
            })
        }
    }

export const getSaleReportWithPagination = {
    useQuery: (queryKey: { key: string; page: number; limit: number }, opt?: UseQueryOptions<PaginatedType, Error>) =>
        useQuery<PaginatedType, Error>({
            queryKey: [queryKey.key, queryKey.page, queryKey.limit],
            queryFn: async () =>{
                const res = await saleServices.getSaleReportWithPagination(
                    queryKey.page,
                    queryKey.limit
                )

                return res.data
            },
            placeholderData: keepPreviousData,
            ...opt
        })
}

export const getSaleReportBySearch = {
    useMutation: (opt?: UseMutationOptions<ApiResponse<PaginatedType>, Error, string, unknown>) => {
            return useMutation({
                mutationKey: ['searchSaleReport'],
                mutationFn: (text: string) => saleServices.getSaleReportBySearch(text),
                ...opt
            })
        }
}