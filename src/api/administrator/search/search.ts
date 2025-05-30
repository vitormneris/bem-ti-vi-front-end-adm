import { GLOBAL_VAR } from "../../config/globalVar";
import { Administrator } from "../create/create";

export type AdministratorPages = {
    administrators: Administrator[],
    totalPages: number
}

export async function search( searchText: string, pageIndex: number ): Promise<AdministratorPages | undefined>{

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/categoria/paginacao?isActive=true&pageSize=10&page=${pageIndex}&name=${searchText}`,{
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data = await response.json()
        
        const administrators: Administrator[] = data.content.map((item: Administrator) => ({
            id: item.id,
            name: item.name,
            pathImage: item.pathImage,
            email: item.email,
            password: item.password
        }));
        
        return {
            administrators: administrators,
            totalPages: data.totalPages
        }
    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}