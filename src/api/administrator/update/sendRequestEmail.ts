import { GLOBAL_VAR } from "../../config/globalVar";
import { Error } from "../../../utils/Types";
import { Administrator } from "../../../utils/Types";

export async function sendRequestEmail(administratorId: string, newEmail: string): Promise<boolean | Error> {

    const objEmail = {
        email: newEmail
    } as Administrator;

    try {
        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/administradores/${administratorId}/solicitartrocaemail`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'PATCH',
            body: JSON.stringify(objEmail),
        });

        if (response.ok) {
            return true;
        } else {
            const data = await response.json();

            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? `/administradores/${administratorId}/solicitartrocaemail`,
                errorFields: data.errorFields ?? null
            };
        }

    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/administradores/${administratorId}/solicitartrocaemail`,
            errorFields: null
        };
    }
};