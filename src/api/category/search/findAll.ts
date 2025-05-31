import { GLOBAL_VAR } from "../../config/globalVar";
import { Category } from "../create/create";

export type CategoryFormated = {
    label: string,
    key: string
}

export async function findAll(): Promise<CategoryFormated[] | undefined> {

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/categorias/buscartodos`,{
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data: Category[] = await response.json()
        
        const categoriesFormated: CategoryFormated[] = data.map((item: Category) => ({
            key: item.id,
            label: item.name,
        }));
        
        return categoriesFormated;
    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}