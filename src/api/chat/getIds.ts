import { GLOBAL_VAR } from "../config/globalVar";
import { Error, UserChat } from "../../utils/Types";

export async function getIds(): Promise<UserChat[] | Error> {

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/mensagens/buscartodosids`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })


        if (response.ok) {
            const data: UserChat[] = await response.json()
            return data;

        } else {
            const data: Error = await response.json()

            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? `/mensagens/buscartodosids`,
                errorFields: data.errorFields ?? null
            };
        }

    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/mensagens/buscartodosids`,
            errorFields: null
        };
    }
}