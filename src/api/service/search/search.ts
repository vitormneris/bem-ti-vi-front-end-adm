import { GLOBAL_VAR } from "../../config/globalVar";
import { Service } from "../create/create";

export type ServicePages = {
    services: Service[],
    totalPages: number
}

export async function search( searchText: string, pageIndex: number ): Promise<ServicePages | undefined> {

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/service/paginacao?isActive=true&pageSize=3&page=${pageIndex}&name=${searchText}`, {
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data = await response.json()
        
        const services: Service[] = data.content.map((item: Service) => ({
            id: item.id,
            name: item.name,
            pathImage: item.pathImage,
            price: item.price,
            description: item.description,
            estimatedDuration: item.estimatedDuration,
        }));
        
        return {
            services: services,
            totalPages: data.totalPages
        }

    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}