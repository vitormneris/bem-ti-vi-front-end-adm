import { GLOBAL_VAR } from "../../config/globalVar";

import { Error, Order, OrderPages } from "../../../utils/Types";

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
                moment: item.moment,
                customer: item.customer,
                totalPrice: item.totalPrice,
                paymentStatus: item.paymentStatus,
                orderItems: item.orderItems,
                methodPaymentByPix: item.methodPaymentByPix,
                deliverToAddress: item.deliverToAddress
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