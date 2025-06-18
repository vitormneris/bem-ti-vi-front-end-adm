import { GLOBAL_VAR } from "../../config/globalVar";
import { Error } from "../../product/update/update";
import { Service } from "../../service/create/create";

export type Customer = {
    id: string;
    name: string;
    email: string;
    password: string;
    pathImage: string;
}

export type Appointment = {
    id: string | null,
    dateTime: Date,
    customer: Customer,
    price: number,
    paymentStatus: string,
    service: Service
}

export type AppointmentPages = {
    appointments: Appointment[],
    totalPages: number
}

export async function search(momentStart: string, momentEnd: string, pageIndex: number): Promise<AppointmentPages | Error> {

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/agendamentos/paginacao?isActive=true&pageSize=3&page=${pageIndex}&momentStart=${momentStart}&momentEnd=${momentEnd}`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })

        const data = await response.json()

        if (response.ok) {

            const appointments: Appointment[] = data.content.map((item: Appointment) => ({
                id: item.id,
                dateTime: item.dateTime,
                customer: item.customer,
                price: item.price,
                paymentStatus: item.paymentStatus,
                service: item.service
            }));

            return {
                appointments: appointments,
                totalPages: data.totalPages
            }
        } else {
            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? `/agendamentos/paginacao?isActive=true&pageSize=3&page=${pageIndex}&momentStart=${momentStart}&momentEnd=${momentEnd}`,
                errorFields: data.errorFields ?? null
            };
        }

    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/agendamentos/paginacao?isActive=true&pageSize=3&page=${pageIndex}&momentStart=${momentStart}&momentEnd=${momentEnd}`,
            errorFields: null
        };
    }
}