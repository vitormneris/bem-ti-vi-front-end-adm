import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image } from "react-native";
import { styles } from "./style";
import { useRoute } from "@react-navigation/native";
import { Administrator } from "../../../utils/Types";
import { NavigationBar } from "../../../components/NavigationBar";

export const ViewAdministrator = () => {
  const route = useRoute();
  const { administrator } = route.params as { administrator: Administrator };
  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={{uri:administrator.pathImage}}
        style={styles.profileImage}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Administrador</Text>
          </View>
          <View style={styles.fieldContainer}>
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Nome</Text>
              <Text style={styles.value}>{administrator.name}</Text>
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{administrator.email}</Text>
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Status de Ativação</Text>
              <Text style={styles.value}>{administrator.activationStatus?.isActive ? "Ativo" : "Desativado"}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <NavigationBar initialTab="perfil" />
    </SafeAreaView>
  );
};