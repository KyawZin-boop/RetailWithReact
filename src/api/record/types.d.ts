export type SaleReportType = {
    saleId: number,
    productCode: string,
    name: string,
    quantity: number,
    sellingPrice: number,
    profitPerItem: number,
    totalProfit: number,
    totalPrice: number,
    saleDate: string
}

export type TotalSummaryType = {
    totalRevenue : number,
    totalProfit : number
}

export type ReportDateType = {
    start : string,
    end : string
}

export type paginationInfo = {
    page: number,
    pageSize: number
}