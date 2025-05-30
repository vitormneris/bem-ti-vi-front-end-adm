import { GLOBAL_VAR } from "../../config/globalVar";
import { Administrator } from "../create/create";

export async function update( administrator: Administrator, imagem: string, administratorId: string ) {

        const formData = new FormData();

        formData.append('administrator', {
            string: JSON.stringify(administrator),
            type: 'application/json',
        } as any);

        formData.append('file', {
            uri: imagem,
            name: 'imagem.jpg',
            type: 'image/jpeg',
        } as any);

        try {
            const response = await fetch(`${GLOBAL_VAR.BASE_URL}/administrator/${administratorId}/atualizar`, {
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