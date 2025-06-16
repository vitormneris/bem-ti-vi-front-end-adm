import { GLOBAL_VAR } from "../../config/globalVar";
import { Administrator } from "../create/create";

export async function findByStatus(value: boolean): Promise<Administrator[] | undefined>{

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/administradores/${value}/buscarporstatus`,{
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const administrators: Administrator[] = await response.json();
        
        return administrators;
        
    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}