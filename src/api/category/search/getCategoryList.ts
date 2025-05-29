import { GLOBAL_VAR } from "../../config/globalVar";
import { Category } from "../create/create";

export type CategoryFormated = {
    label: string,
    key: string
}

export async function getCategoryList(): Promise<CategoryFormated[] | undefined> {

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/categoria/paginacao?isActive=true&pageSize=30&page=0`,{
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data = await response.json()
        
        const categoriesFormated: CategoryFormated[] = data.content.map((item: Category) => ({
            key: item.id,
            label: item.name,
        }));
        
        return categoriesFormated;
    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}