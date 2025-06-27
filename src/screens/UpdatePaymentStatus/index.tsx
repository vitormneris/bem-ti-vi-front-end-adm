import React, { useState } from "react";
import { View, Text, Alert, Button, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import { updatePaymentStatus as updateOrder } from "../../api/order/update/update";
import { updatePaymentStatus as updateAppointment } from "../../api/appointment/update/update";

import { Order, Appointment } from "../../utils/Types";

export function UpdatePaymentStatus() {
  const { goBack } = useNavigation();
  const route = useRoute();
  const { item, type } = route.params as {
    item: Order | Appointment;
    type: "order" | "appointment";
  };
  const [loading, setLoading] = useState<boolean>(false);

  const [newPaymentStatus, setNewPaymentStatus] = useState(item.paymentStatus);
  const pickerItems = [
    { label: "Esperando pagamento", value: "WAITING_PAYMENT" },
    { label: "Pago", value: "PAID" },
    { label: "Cancelado", value: "CANCELED" },
  ];

  if (type === "order") {
    pickerItems.splice(
      2,
      0,
      { label: "Enviado", value: "SHIPPED" },
      { label: "Entregue", value: "DELIVERED" }
    );
  }

  const handleUpdate = async () => {
    setLoading(true);
    let result;

    try {
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
      }
    } catch (error) {
      Alert.alert("Erro", result?.message || "Erro ao atualizar status.");
    } finally {
      setLoading(false);
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

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#256489"
          style={{ marginTop: 20 }}
        />
      ) : (
        <Button title="Salvar" onPress={handleUpdate} />
      )}
    </View>
  );
}
