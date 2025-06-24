import { Category } from "../../../utils/Types";
import { GLOBAL_VAR } from "../../config/globalVar"

export async function findById( categoryId: string ): Promise<Category | undefined> {
    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/categorias/${categoryId}/buscar`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`);
        }

        const data: Category = await response.json();
        
        return data;

    } catch (error) {
        console.error('Erro na requisição: ', error);
    }
}