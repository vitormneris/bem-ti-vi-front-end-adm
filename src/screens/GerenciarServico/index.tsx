import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import styles from './style';

const GerenciarServico = ({ titulo = "GERENCIAR" }: { titulo?: string }) => {
  const [nomeServico, setNomeServico] = useState<string>('');
  const [descricaoServico, setDescricaoServico] = useState<string>('');
  const [precoServico, setPrecoServico] = useState<string>('');
  const [duracaoEstimada, setDuracaoEstimada] = useState<string>('');
  const [imagem, setImagem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  const serviceId = "id";

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };
  useEffect(() => {
    const buscarServico = async () => {
      try {
        const resposta = await fetch(`http://URL:8080/service/${serviceId}/buscar`);
        if (!resposta.ok) {
          throw new Error('Erro ao buscar servico');
        }
  
        const servico = await resposta.json();
        setNomeServico(servico.name || '');
        setPrecoServico(String(servico.price) || '');
        setDescricaoServico(servico.description || '');
        setDuracaoEstimada(servico.estimated_duration || '');
        setImagem(servico.pathImage);
      } catch (erro) {
        console.error('Erro ao buscar servico:', erro);
        Alert.alert('Erro', 'Não foi possível carregar os dados do serviço.');
      }
    };
  
    buscarServico();
  }, []);

  const atualizarServico = async () => {
    if (!nomeServico || !imagem) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
      return;
    }
  
    const servico = {
      name: nomeServico,
      price: precoServico,
      estimated_duration: duracaoEstimada,
      description:descricaoServico 
    };

    const formData = new FormData();

    formData.append('service', {
      string: JSON.stringify(servico),
      name: 'service',
      type: 'application/json',
    } as any);

    formData.append('file', {
      uri: imagem,
      name: 'imagem.jpg',
      type: 'image/jpeg',
    } as any);
  
    try {
      const response = await fetch(`http://URL:8080/service/${serviceId}/atualizar`, {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        Alert.alert("Sucesso", "Serviço atualizado com sucesso!");
      } else {
        const error = await response.json();
        Alert.alert("Erro", error.message || "Erro ao atualizar o serviço.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };
  
  const deletarServico = async () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja deletar este serviço?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`http://URL:8080/service/${serviceId}/deletar`, {
                method: 'DELETE',
              });
  
              if (response.ok) {
                Alert.alert('Sucesso', 'Serviço deletado com sucesso!');
              } else {
                const erro = await response.json();
                Alert.alert('Erro', erro.message || 'Erro ao deletar o serviço.');
              }
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
            }
          },
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Image 
              source={require('../../assets/images/seta-voltar.png')} 
              style={styles.backIcon} 
            />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{titulo}</Text>
            <Image 
              source={require('../../assets/images/cachorro.png')} 
              style={styles.menuIcon} 
            />
          </View>
        </View>

        {/* Service Info Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Informações do Serviço</Text>
          <View style={styles.divider} />
        </View>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome do Serviço</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite o nome do serviço"
            placeholderTextColor="#999"
            value={nomeServico}
            onChangeText={setNomeServico}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Preço do Serviço</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite o valor do serviço"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={precoServico}
            onChangeText={setPrecoServico}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Duração Estimada</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ex: 1 hora, 30 minutos, etc."
            placeholderTextColor="#999"
            value={duracaoEstimada}
            onChangeText={setDuracaoEstimada}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Imagem do Serviço</Text>
          <TouchableOpacity 
            style={[
              styles.imagePicker, 
              imagem ? styles.imagePickerActive : null
            ]} 
            onPress={selecionarImagem}
          >
            <Text style={[
              styles.imagePickerText,
              imagem ? styles.imagePickerTextActive : null
            ]}>
              {imagem ? 'Imagem selecionada (clique para alterar)' : 'Selecione uma imagem'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição do Serviço</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Descreva o serviço em detalhes"
            placeholderTextColor="#999"
            multiline
            value={descricaoServico}
            onChangeText={setDescricaoServico}
          />
        </View>

        {/* Submit Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.submitButton, styles.deleteButton]} onPress={deletarServico}>
            <Text style={styles.submitButtonText}>DELETAR</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.submitButton} onPress={atualizarServico}>
            <Text style={styles.submitButtonText}>ATUALIZAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('home')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'home' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/home.png')} 
              style={styles.navIcon} 
            />
          </View>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('loja')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'loja' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/carrinho.png')} 
              style={styles.navIcon} 
            />
          </View>
          <Text style={styles.navLabel}>Loja</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('servicos')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'servicos' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/cachorro.png')} 
              style={styles.navIcon} 
            />
          </View>
          <Text style={styles.navLabel}>Serviços</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('perfil')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'perfil' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/perfil.png')} 
              style={styles.navIcon} 
            />
          </View>
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GerenciarServico;