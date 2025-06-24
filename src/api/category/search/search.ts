import { Category, CategoryPages } from "../../../utils/Types";
import { GLOBAL_VAR } from "../../config/globalVar";

export async function search( searchText: string, pageIndex: number ): Promise<CategoryPages | undefined>{

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/categorias/paginacao?isActive=true&pageSize=10&page=${pageIndex}&name=${searchText}`,{
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data = await response.json()
        
        const categories: Category[] = data.content.map((item: Category) => ({
            id: item.id,
            name: item.name,
            pathImage: item.pathImage,
            cardColor: item.cardColor
        }));
        
        return {
            categories: categories,
            totalPages: data.totalPages
        }
    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}