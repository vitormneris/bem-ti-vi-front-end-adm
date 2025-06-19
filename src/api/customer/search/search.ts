import { GLOBAL_VAR } from "../../config/globalVar";
import { Product } from "../../product/create/create";
import { Service } from "../../service/create/create";

export type Customer = {
    id: string;
    name: string;
    email: string;
    pathImage: string;
    appointments: Appointment[]
    orders: Order[]
    pets: Pet[]
}

export type Pet = {
    id: string;
    name: string;
}

export type OrderItem = {
    id: string;
    price: number;
    quantity: number;
    product: Product;
}

export type Order = {
    id: string;
    dateTime: Date;
    customer: Customer;
    totalPrice: number;
    paymentStatus: string;
    orderItems: OrderItem;
}

export type Appointment = {
    id: string,
    dateTime: Date,
    customer: Customer,
    price: number,
    paymentStatus: string,
    service: Service
}

export type CustomerPages = {
    customers: Customer[],
    totalPages: number
}

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
