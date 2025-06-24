import { GLOBAL_VAR } from "../../config/globalVar";
import { Error } from "../../../utils/Types";

export async function deleteById(administratorId: string, password: string): Promise<boolean | Error> {
    try {
        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/administradores/${administratorId}/deletar`, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });

        if (response.status === 204) {
            return true;
        } else {
            const data = await response.json();
            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? `/administradores/${administratorId}/deletar`,
                errorFields: data.errorFields ?? null
            };
        }
    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/administradores/${administratorId}/deletar`,
            errorFields: null
        };
    }
}
