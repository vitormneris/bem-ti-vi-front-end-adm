import { GLOBAL_VAR } from "../../config/globalVar"
import { Product } from "../create/create"

export async function findById(productId: string ): Promise<Product | undefined> {

    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/produtos/${productId}/buscar`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })

        if (!response.ok) {
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data: Product = await response.json()

        return data

    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}