import { GLOBAL_VAR } from "../../config/globalVar";
import { Error } from "../../../utils/Types";
import { Administrator } from "../../../utils/Types";

export async function findByStatus(value: boolean): Promise<Administrator[] | Error> {

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/administradores/${value}/buscarporstatus`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })


        if (response.ok) {
            const administrators: Administrator[] = await response.json();
            return administrators;

        } else {
            const data = await response.json();

            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? `/administradores/${value}/buscarporstatus`,
                errorFields: data.errorFields ?? null
            };
        }

    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/administradores/${value}/buscarporstatus`,
            errorFields: null
        };
    }
}