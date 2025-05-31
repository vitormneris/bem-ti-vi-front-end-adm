import { GLOBAL_VAR } from "../../config/globalVar";

export async function deleteById( administratorId: string ) {
    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/administradores/${administratorId}/deletar`,{
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'DELETE',
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