import { GLOBAL_VAR } from "../../config/globalVar";

export async function activationById( administratorId: string ) {
    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/administradores/${administratorId}/ativar`,{
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })

        if (response.status === 204) {
            return true;
        } else {
            console.error(`Erro ao excluir: código ${response.status}`);
            return false;
        }

    } catch (error) {
        console.error('Erro na requisição DELETE: ', error)
    }
}