import { GLOBAL_VAR } from '../../config/globalVar'
import { Error, Token, UserAuth } from '../../../utils/Types';

export async function login(userAuth: UserAuth): Promise<Token | Error> {
    try {
        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/autenticacao/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userAuth),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? '/autenticacao/login',
                errorFields: data.errorFields ?? null
            };
        }

        return { token: data.token };

    } catch (err) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: '/autenticacao/login',
            errorFields: null,
        };
    }
}
