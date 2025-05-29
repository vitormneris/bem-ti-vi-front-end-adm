import { GLOBAL_VAR } from "../../config/globalVar"
import { Category } from "../create/create"

export async function findById( categoryId: string ): Promise<Category | undefined> {
    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/categoria/${categoryId}/buscar`, {
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