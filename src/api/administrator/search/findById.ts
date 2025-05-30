import { GLOBAL_VAR } from "../../config/globalVar"
import { Administrator } from "../create/create"

export async function findById( administratorId: string ): Promise<Administrator | undefined> {
    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/administrator/${administratorId}/buscar`, {
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`);
        }

        const data: Administrator = await response.json();
        
        return data;

    } catch (error) {
        console.error('Erro na requisição: ', error);
    }
}