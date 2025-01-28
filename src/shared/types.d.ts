export type ApiResponse<T> = {
    message: string
    status: number
    data: T
}

export type PaginatedType = {
    items: [],
    totalCount: number,
    totalPages: number
}