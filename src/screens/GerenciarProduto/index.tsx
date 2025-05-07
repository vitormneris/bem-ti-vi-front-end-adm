import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, SafeAreaView } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { NavigationBar } from '../../components/NavigationBar';

import { styles } from './style';

type CategoriaType = {
  label: string;
  value: string;
};

export default function GerenciarProduto() {
  const [categoria, setCategoria] = useState<string>('');
  const [nomeProduto, setNomeProduto] = useState<string>('');
  const [valorProduto, setValorProduto] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [imagem, setImagem] = useState<string | null>(null);

  const productId = "id";

  const categorias: CategoriaType[] = [
    { label: '', value: '' },
    { label: 'Alimentos', value: 'id' },
    { label: 'Beleza', value: 'Beleza' },
    { label: 'Limpeza', value: 'Limpeza' },
    { label: 'Farmácia', value: 'Farmácia' },
    { label: 'Brinquedos', value: 'Brinquedos' },
  ];

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
    const buscarProduto = async () => {
      try {
        const resposta = await fetch(`http://URL:8080/produto/${productId}/buscar`);
        if (!resposta.ok) {
          throw new Error('Erro ao buscar produto');
        }

        const produto = await resposta.json();
        setNomeProduto(produto.name || '');
        setValorProduto(String(produto.price) || '');
        setDescricao(produto.description || '');
        setCategoria(produto.categories?.[0]?.id || '');
        setImagem(produto.pathImage);
      } catch (erro) {
        console.error('Erro ao buscar produto:', erro);
        Alert.alert('Erro', 'Não foi possível carregar os dados do produto.');
      }
    };

    buscarProduto();
  }, []);

  const atualizarProduto = async () => {
    if (!nomeProduto || !valorProduto || !descricao || !categoria) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
      return;
    }

    const produto = {
      name: nomeProduto,
      price: parseFloat(valorProduto),
      categories: [
        { id: "id" }
      ],
      description: descricao,
    };

    const formData = new FormData();

    formData.append('product', {
      string: JSON.stringify(produto),
      name: 'product',
      type: 'application/json',
    } as any);

    formData.append('file', {
      uri: imagem,
      name: 'imagem.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await fetch(`http://URL:8080/produto/${productId}/atualizar`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      } else {
        const error = await response.json();
        Alert.alert("Erro", error.message || "Erro ao atualizar o produto.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  const deletarProduto = async () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja deletar este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`http://URL:8080/produto/${productId}/deletar`, {
                method: 'DELETE',
              });

              if (response.ok) {
                Alert.alert('Sucesso', 'Produto deletado com sucesso!');
              } else {
                const erro = await response.json();
                Alert.alert('Erro', erro.message || 'Erro ao deletar o produto.');
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
        <Header title="GERENCIAR" icon={require('../../assets/images/icone-menu.png')} />

        {/* Product Info Section */}
        <Title text="Informações do Produto" />

        {/* Form Fields */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome do Produto</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite o nome do produto"
            placeholderTextColor="#999"
            value={nomeProduto}
            onChangeText={setNomeProduto}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Valor do Produto</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite o valor do produto"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={valorProduto}
            onChangeText={setValorProduto}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Categoria do Produto</Text>
          <View style={styles.pickerWrapper}>
            {!categoria && (
              <Text style={styles.pickerPlaceholder}>
                Selecione uma categoria
              </Text>
            )}
            <Picker
              selectedValue={categoria}
              onValueChange={setCategoria}
              style={styles.picker}
            >
              {categorias.map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Imagem do Produto</Text>
          <TouchableOpacity
            style={[
              styles.imagePicker,
              imagem ? styles.imagePickerActive : null
            ]}
            onPress={selecionarImagem}
          >
            {imagem ? (
              <Image
                source={{ uri: imagem }}
                style={styles.imagePreview}
              />
            ) : (
              <Text style={[
                styles.imagePickerText,
                imagem ? styles.imagePickerTextActive : null
              ]}>
                {imagem ? 'Imagem selecionada (clique para alterar)' : 'Selecione uma imagem'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição do Produto</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Digite a descrição do produto"
            placeholderTextColor="#999"
            multiline
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>

        {/* Submit Buttons */}
        <View style={styles.buttonsContainer}>
          <Button text="DELETAR" color="#B40000" action={deletarProduto} />
          <Button text="ATUALIZAR" color="#006516" action={atualizarProduto} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Navigation */}
      <NavigationBar />
    </SafeAreaView>
  );
};