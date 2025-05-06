import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './style';

const GerenciarCategoria = ({ titulo = "GERENCIAR" }: { titulo?: string }) => {
  const [nomeCategoria, setNomeCategoria] = useState<string>('');
  const [imagem, setImagem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  const categoryId = "id";

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
    const buscarCategoria = async () => {
      try {
        const resposta = await fetch(`http://URL:8080/categoria/${categoryId}/buscar`);
        if (!resposta.ok) {
          throw new Error('Erro ao buscar categoria');
        }
  
        const categoria = await resposta.json();
        setNomeCategoria(categoria.name || '');
        setImagem(categoria.pathImage);
      } catch (erro) {
        console.error('Erro ao buscar categoria:', erro);
        Alert.alert('Erro', 'Não foi possível carregar os dados da categoria.');
      }
    };
  
    buscarCategoria();
  }, []);

  const atualizarCategoria = async () => {
    if (!nomeCategoria || !imagem) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
      return;
    }
  
    const categoria = {
      name: nomeCategoria,
      cardColor: "#FF00FF05"
    };

    const formData = new FormData();

    formData.append('category', {
      string: JSON.stringify(categoria),
      name: 'category',
      type: 'application/json',
    } as any);

    formData.append('file', {
      uri: imagem,
      name: 'imagem.jpg',
      type: 'image/jpeg',
    } as any);
  
    try {
      const response = await fetch(`http://URL:8080/categoria/${categoryId}/atualizar`, {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        Alert.alert("Sucesso", "Categoria atualizada com sucesso!");
      } else {
        const error = await response.json();
        Alert.alert("Erro", error.message || "Erro ao atualizar a categoria.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };
  
  const deletarCategoria = async () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja deletar esta categoria?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`http://URL:8080/categoria/${categoryId}/deletar`, {
                method: 'DELETE',
              });
  
              if (response.ok) {
                Alert.alert('Sucesso', 'Categoria deletada com sucesso!');
              } else {
                const erro = await response.json();
                Alert.alert('Erro', erro.message || 'Erro ao deletar a categoria.');
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
              source={require('../../assets/images/categorias.png')} 
              style={styles.menuIcon} 
            />
          </View>
        </View>

        {/* Category Info Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Informações da Categoria</Text>
          <View style={styles.divider} />
        </View>

        {/* Nome da Categoria Input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome da Categoria</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Insira o nome da categoria"
            placeholderTextColor="#999"
            value={nomeCategoria}
            onChangeText={setNomeCategoria}
          />
        </View>

        {/* Image Picker */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Imagem da Categoria</Text>
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
          
          {imagem && (
            <View style={styles.imagePreviewContainer}>
              <Image 
                source={{ uri: imagem }} 
                style={styles.imagePreview} 
              />
            </View>
          )}
        </View>

        {/* Submit Buttons */}
        <View style={styles.submitButtonsContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={deletarCategoria}>
            <Text style={styles.submitButtonText}>DELETAR</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.submitButton} onPress={atualizarCategoria}>
            <Text style={styles.submitButtonText}>ATUALIZAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
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

export default GerenciarCategoria;