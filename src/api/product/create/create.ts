import { Alert } from 'react-native';
import { GLOBAL_VAR } from '../../config/globalVar'
import { Error, Product } from '../../../utils/Types';

export async function create(product: Product, image: string): Promise<boolean | Error> {
    if (!image) {
        Alert.alert("Atenção!", "Você precisa enviar uma imagem.");
        return false;
    }

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

    try {
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
            const data = await response.json();

            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? `/produtos/inserir`,
                errorFields: data.errorFields ?? null
            };
        }
    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/produtos/inserir`,
            errorFields: null
        };
    }
} 