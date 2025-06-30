import React, { useState } from "react";
import { View, Text, Alert, Button, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import { updatePaymentStatus as updateOrder } from "../../api/order/update/update";
import { updatePaymentStatus as updateAppointment } from "../../api/appointment/update/update";

import { Order, Appointment } from "../../utils/Types";
import { styles } from "./style";

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
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar status de pagamento</Text>
      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={newPaymentStatus}
        onValueChange={(value) => setNewPaymentStatus(value)}
        style={styles.picker}
        dropdownIconColor="#256489"

      >
        {pickerItems.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#256489"
          style={{ marginTop: 20 }}
        />
      ) : (
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Salvar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
