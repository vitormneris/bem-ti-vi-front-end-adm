import { GLOBAL_VAR } from "../../config/globalVar";

export async function deleteById( productId: string ) {

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/produtos/${productId}/deletar`,{
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
                path: data.path ?? `/produtos/${productId}/deletar`,
                errorFields: data.errorFields ?? null
            };
        }

    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/produtos/${productId}/deletar`,
            errorFields: null
        };
    }
}