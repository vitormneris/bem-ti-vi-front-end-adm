import { Appointment } from "../../../utils/Types";
import { GLOBAL_VAR } from "../../config/globalVar";


export async function updatePaymentStatus(appointmentId: string, appointmentUpdated: Appointment) {
  try {
    const response = await fetch(`${GLOBAL_VAR.BASE_URL}/agendamento/${appointmentId}/atualizar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + GLOBAL_VAR.TOKEN_JWT,
      },
      body: JSON.stringify(appointmentUpdated),
    });

    if (response.ok) return { success: true };
    
    const data = await response.json();
    return { success: false, message: data.message };
  } catch {
    return { success: false, message: 'Erro de conexão com o servidor.' };
  }
}
