import { GLOBAL_VAR } from "../../config/globalVar";
import { Service } from "../create/create";

export async function findById( serviceId: string ): Promise<Service | undefined>{
    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/service/${serviceId}/buscar`, {
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`);
        }

        const data: Service = await response.json();
        
        return data;

    } catch (error) {
        console.error('Erro na requisição: ', error);
    }
}