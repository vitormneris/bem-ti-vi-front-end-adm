import React, { useState } from "react";
import { View, Text, Alert, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import { updatePaymentStatus as updateOrder } from "../../api/order/update/update";
import { updatePaymentStatus as updateAppointment } from "../../api/appointment/update/update";

import { Order } from "../../api/order/search/search";
import { Appointment } from "../../api/appointment/search/search";

export function UpdatePaymentStatus() {
  const { goBack } = useNavigation();
  const route = useRoute();
  const { item, type } = route.params as {
    item: Order | Appointment;
    type: "order" | "appointment";
  };

  const [newPaymentStatus, setNewPaymentStatus] = useState(item.paymentStatus);
  const pickerItems = [
  { label: 'Esperando pagamento', value: 'WAITING_PAYMENT' },
  { label: 'Pago', value: 'PAID' },
  { label: 'Cancelado', value: 'CANCELED' },
];

if (type === 'order') {
  pickerItems.splice(2, 0,
    { label: 'Enviado', value: 'SHIPPED' },
    { label: 'Entregue', value: 'DELIVERED' }
  );
}


  const handleUpdate = async () => {
    let result;

    if (type === "order") {
      const orderItem = item as Order;
      const orderUpdated: Order = {
        ...orderItem,
        paymentStatus: newPaymentStatus,
      };
      result = await updateOrder(orderUpdated.id!, orderUpdated);
    } else {
      const appointmentItem = item as Appointment;
      const appointmentUpdated: Appointment = {
        ...appointmentItem,
        paymentStatus: newPaymentStatus,
      };
      result = await updateAppointment(
        appointmentUpdated.id!,
        appointmentUpdated
      );
    }

    if (result?.success) {
      Alert.alert("Sucesso", "Status atualizado com sucesso!");
      goBack();
    } else {
      Alert.alert("Erro", result?.message || "Erro ao atualizar status.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Atualizar status de pagamento</Text>
      <Picker
        selectedValue={newPaymentStatus}
        onValueChange={(value) => setNewPaymentStatus(value)}
      >
        {pickerItems.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
      <Button title="Salvar" onPress={handleUpdate} />
    </View>
  );
}
