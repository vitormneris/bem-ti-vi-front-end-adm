import { Alert } from 'react-native';
import { GLOBAL_VAR } from '../../config/globalVar';

export type Category = {
    id: string | null;
    name: string;
    pathImage: string | null;
    cardColor: string;
};

export async function create(category: Category, image: string | null) {
    if (!image) {
        Alert.alert("Atenção!", "Você precisa enviar uma imagem.");
        return false;
    }

    const formData = new FormData();

    formData.append('category', {
        string: JSON.stringify(category),
        type: 'application/json'
    } as any);

    formData.append('file', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg'
    } as any);

    try {
        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/categoria/inserir`, {
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
