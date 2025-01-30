export type LoginPayload = {
    email: string;
    password: string;
}

export type LoginResponse = {
    status: number;
    message: string;
    data: string;
}