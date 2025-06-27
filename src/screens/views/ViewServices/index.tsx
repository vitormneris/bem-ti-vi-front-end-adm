import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps } from '../../../routes/AppRoute';
import { NavigationBar } from '../../../components/NavigationBar';
import { styles } from './style';
import { Service } from '../../../utils/Types';

export const ViewServices = () => {
  const { navigate } = useNavigation<NavigationProps>();
  const route = useRoute();
  const { service } = route.params as { service: Service };
  const precoFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(service.price);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Imagem e nome */}
        <View style={styles.profileSection}>
          <Image source={{uri:service.pathImage}} style={styles.profileImage} />
          <Text style={styles.clientName}>{service.name}</Text>
        </View>

        {/* Seção de informações */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Informações do Serviço</Text>
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Preço</Text>
              <Text style={styles.value}>{precoFormatado}</Text>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.label}>Avaliação</Text>
              <Text style={styles.value}>{service.rate?service.rate:'0.0'} ⭐</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.description}>{service.description}</Text>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.label}>Status</Text>
              <Text style={styles.value}>
                {service.activationStatus?.isActive ? "Ativo" : "Desativado"}
              </Text>
            </View>

            {/* <View style={styles.descriptionContainer}>
              <Text style={styles.label}>Categorias</Text>
              <Text style={styles.description}>{service.categories.join(', ')}</Text>
            </View> */}
          </View>
        </View>
      </ScrollView>
        <NavigationBar initialTab='servicos' />
    </SafeAreaView>
  );
};