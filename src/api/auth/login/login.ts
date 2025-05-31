import { GLOBAL_VAR } from '../../config/globalVar'

export type UserAuth = {
    email: string,
    password: string,
};

export type Token = {
    token: string
}

export async function login(userAuth : UserAuth): Promise<Token> {
    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/autenticacao/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(userAuth),
        });

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data: Token = await response.json();
        
        return data;
    } catch (error) {
        console.error('Erro na requisição POST: ', error)
        throw error;
    }
} 