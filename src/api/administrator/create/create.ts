import { Alert } from 'react-native';
import { GLOBAL_VAR } from '../../config/globalVar';
import { Error } from '../../../utils/Types';

type ActivationStatus = {
    isActive: boolean;
    creationDate: string;
    deactivationDate: string;
}

export type Administrator = {
    id: string;
    name: string;
    email: string;
    password: string;
    pathImage: string;
    isEmailActive: boolean;
    activationStatus: ActivationStatus | null;
};

export async function create(administrator: Administrator, image: string): Promise<boolean | Error> {
    if (!image) {
        Alert.alert("Atenção!", "Você precisa enviar uma imagem.");
        return false;
    }

    const formData = new FormData();

    formData.append('administrator', {
        string: JSON.stringify(administrator),
        type: 'application/json'
    } as any);

    formData.append('file', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg'
    } as any);

    try {
        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/administradores/inserir`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'POST',
            body: formData
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
                path: data.path ?? `/administradores/inserir`,
                errorFields: data.errorFields ?? null
            };
        }
    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/administradores/inserir`,
            errorFields: null
        };
    }
}
