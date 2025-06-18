import { GLOBAL_VAR } from "../../config/globalVar";
import { Error } from "../../product/update/update";

export async function deactivationById( administratorId: string ): Promise<boolean | Error> {
    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/administradores/${administratorId}/desativar`,{
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'DELETE',
        })

        if (response.status === 204) {
            return true;
        } else {
            const data = await response.json();

            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? `/administradores/${administratorId}/desativar`,
                errorFields: data.errorFields ?? null
            };
        }

    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/administradores/${administratorId}/desativar`,
            errorFields: null
        };
    }
}