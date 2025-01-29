export type CartInputType = {
    productCode: string,
    name: string,
    quantity: number
}

export type CartType = {
    id: string,
    productCode: string,
    name: string,
    quantity: number,
    stock: number,
    price: number
}