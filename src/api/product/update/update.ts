import { GLOBAL_VAR } from "../../config/globalVar";
import { Product } from "../create/create";

export async function update( product: Product, image: string | null, productId: string ){

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
            const response = await fetch(`${GLOBAL_VAR.BASE_URL}/produto/${productId}/atualizar`, {
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