import { Service, ServicePages } from "../../../utils/Types";
import { GLOBAL_VAR } from "../../config/globalVar";

export async function search(searchText: string, pageIndex: number): Promise<ServicePages | undefined> {

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/servicos/paginacao?isActive=true&pageSize=3&page=${pageIndex}&name=${searchText}`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })

        if (!response.ok) {
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