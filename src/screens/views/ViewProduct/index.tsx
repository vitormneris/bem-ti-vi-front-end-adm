import React from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import { styles } from "./style";
import { useRoute } from "@react-navigation/native";
import { Product } from "../../../utils/Types";
import { NavigationBar } from "../../../components/NavigationBar";

export const ViewProduct = () => {
  const route = useRoute();
  const { product } = route.params as { product: Product };
  const precoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Image
          source={{ uri: product.pathImage }}
          style={styles.profileImage}
        />
        <View style={styles.container}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Produto</Text>
            </View>

            <View style={styles.fieldContainer}>
              <View style={styles.fieldRow}>
                <Text style={styles.label}>Nome</Text>
                <Text style={styles.value}>{product.name}</Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Preço</Text>
                <Text style={styles.value}>{precoFormatado}</Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Descrição</Text>
                <Text style={styles.value}>{product.description}</Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Avaliação</Text>
                <Text style={styles.value}>{product.rate?product.rate:"0.0"} ⭐</Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Status</Text>
                <Text style={styles.value}>
                  {product.activationStatus?.isActive ? "Ativo" : "Desativado"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <NavigationBar initialTab="loja" />
    </SafeAreaView>
  );
};
