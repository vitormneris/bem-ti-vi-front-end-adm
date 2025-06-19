import { GLOBAL_VAR } from "../../config/globalVar";
import { Error } from "../../product/update/update";
import { Category } from "../create/create";

export type CategoryFormated = {
    label: string,
    key: string
}

export async function findAll(): Promise<CategoryFormated[] | Error> {

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/categorias/buscartodos`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })

        if (response.ok) {
            const data: Category[] = await response.json()

            const categoriesFormated: CategoryFormated[] = data.map((item: Category) => ({
                key: item.id,
                label: item.name,
            }));

            return categoriesFormated;

        } else {
            const data = await response.json()
            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? `/categorias/buscartodos`,
                errorFields: data.errorFields ?? null
            };
        }

    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/categorias/buscartodos`,
            errorFields: null
        };
    }
}