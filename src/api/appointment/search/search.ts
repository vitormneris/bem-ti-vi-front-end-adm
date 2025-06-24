import { GLOBAL_VAR } from "../../config/globalVar";
import { Appointment, AppointmentPages, Error } from "../../../utils/Types";


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
                service: item.service,
                methodPaymentByPix: item.methodPaymentByPix
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