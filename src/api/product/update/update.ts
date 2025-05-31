import { GLOBAL_VAR } from "../../config/globalVar";
import { Product } from "../create/create";

export async function update(product: Product, image: string, productId: string) {

    const formData = new FormData();

    formData.append('product', {
        string: JSON.stringify(product),
        type: 'application/json',
    } as any);

    formData.append('file', {
        uri: image,
        name: 'imagem.jpg',
        type: 'image/jpeg',
    } as any);

    try {
        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/produtos/${productId}/atualizar`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'PUT',
            body: formData,
        });

        if (response.status === 200) {
            return true;
        } else {
            console.error(`Erro ao atualizar: código ${response.status}`);
            return false;
        }

    } catch (error) {
        console.error('Erro na requisição UPDATE: ', error)
        throw error;
    }
};