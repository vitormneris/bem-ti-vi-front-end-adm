import { Customer, CustomerPages } from "../../../utils/Types";
import { GLOBAL_VAR } from "../../config/globalVar";


export async function search(searchText: string, pageIndex: number): Promise<CustomerPages | undefined> {
    try {
        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/clientes/paginacao?isActive=true&pageSize=3&page=${pageIndex}&name=${encodeURIComponent(searchText)}`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        });

        if (!response.ok) {
            console.error(`Algo errado no response: ${response.status}`);
            return undefined;
        }

        const data = await response.json();

        const customers: Customer[] = data.content.map((item: any) => ({
            id: item.id,
            name: item.name,
            email: item.email,
            pathImage: item.pathImage,
            appointments: item.appointments ?? [],
            orders: item.orders ?? [],     
            pets: item.pets ?? [],         
        }));

        return {
            customers,
            totalPages: data.totalPages
        };

    } catch (error) {
        console.error('Erro na requisição: ', error);
        return undefined;
    }
}
