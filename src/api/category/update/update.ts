import { GLOBAL_VAR } from "../../config/globalVar";
import { Category, Error } from "../../../utils/Types";

export async function update(categoria: Category, imagem: string, categoryId: string ): Promise<boolean | Error> {

    const formData = new FormData();

    formData.append('category', {
        string: JSON.stringify(categoria),
        type: 'application/json',
    } as any);

    formData.append('file', {
        uri: imagem,
        name: 'imagem.jpg',
        type: 'image/jpeg',
    } as any);

    try {
        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/categorias/${categoryId}/atualizar`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'PUT',
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            return true;
        } else {
            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? `/categorias/${categoryId}/atualizar`,
                errorFields: data.errorFields ?? null
            };
        }

    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/categorias/${categoryId}/atualizar`,
            errorFields: null
        };
    }
};