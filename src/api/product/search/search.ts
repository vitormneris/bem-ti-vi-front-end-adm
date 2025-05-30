import { GLOBAL_VAR } from "../../config/globalVar";
import { Product } from "../create/create";

export type ProductPages = {
    product: Product[],
    totalPages: number
}

export async function search( searchText: string, pageIndex: number ): Promise<ProductPages | undefined> {
    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/produto/paginacao?isActive=true&pageSize=3&page=${pageIndex}&name=${searchText}`,{
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data = await response.json()
        
        const products: Product[] = data.content.map((item: Product) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            pathImage: item.pathImage,
            description: item.description,
            categories: item.categories,
        }));
        
        return {
            product: products,
            totalPages: data.totalPages
        }

    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}
