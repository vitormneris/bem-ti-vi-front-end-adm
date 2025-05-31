import { Category } from '../../category/create/create';
import { GLOBAL_VAR } from '../../config/globalVar'

export type Product = {
    id: string | null,
    name: string,
    price: number,
    pathImage: string,
    description: string,
    categories: Category[],
};

export async function create(product: Product, image: string) {
    try {
        const formData = new FormData();

        formData.append('product', {
            string: JSON.stringify(product),
            type: 'application/json'
        } as any);

        formData.append('file', {
            uri: image,
            name: 'imagem.jpg',
            type: 'image/jpeg',
        } as any);

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/produtos/inserir`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'POST',
            body: formData,
        });
        if (response.status === 201) {
            return true;
        } else {
            console.error(`Erro ao cadastrar: código ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error('Erro na requisição POST: ', error)
        throw error;
    }
} 