import { Alert } from 'react-native';
import { GLOBAL_VAR } from '../../config/globalVar';

export type Administrator = {
    id: string;
    name: string;
    email: string;
    password: string;
    pathImage: string;
};

export async function create(administrator: Administrator, image: string) {
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

        const text = await response.text();

        if (response.status === 201) {
            return true;
        } else {
            console.error(`Erro ao cadastrar: código ${response.status}`);
            console.log('Resposta do servidor:', text);
            return false;
        }
    } catch (error) {
        console.error('Erro na requisição POST: ', error);
        return false;
    }
}
