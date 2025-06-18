import { GLOBAL_VAR } from "../../config/globalVar";

import { Product } from "../../product/create/create";

import { Error } from "../../product/update/update";

export type Customer = {
    id: string;
    name: string;
    email: string;
    password: string;
    pathImage: string;
}

export type OrderItem = {
    id: string;
    price: number;
    quantity: number;
    product: Product;
}

export type Order = {
    id: string | null;
    dateTime: Date;
    customer: Customer;
    totalPrice: number;
    paymentStatus: string;
    orderItems: OrderItem;
}

export type OrderPages = {
    orders: Order[];
    totalPages: number;
}

export async function search(momentStart: string, momentEnd: string, pageIndex: number): Promise<OrderPages | Error> {

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/pedidos/paginacao?isActive=true&pageSize=3&page=${pageIndex}&momentStart=${momentStart}&momentEnd=${momentEnd}`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })

        const data = await response.json()

        if (response.ok) {

            const orders: Order[] = data.content.map((item: Order) => ({
                id: item.id,
                dateTime: item.dateTime,
                customer: item.customer,
                totalPrice: item.totalPrice,
                paymentStatus: item.paymentStatus,
                orderItems: item.orderItems
            }));

            return {
                orders: orders,
                totalPages: data.totalPages
            }
        } else {
            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? `/pedidos/paginacao?isActive=true&pageSize=3&page=${pageIndex}&momentStart=${momentStart}&momentEnd=${momentEnd}`,
                errorFields: data.errorFields ?? null
            };
        }

    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/pedidos/paginacao?isActive=true&pageSize=3&page=${pageIndex}&momentStart=${momentStart}&momentEnd=${momentEnd}`,
            errorFields: null
        };
    }
}