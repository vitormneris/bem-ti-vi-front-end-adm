import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import styles from './style';

type CategoriaType = {
  label: string;
  value: string;
};

const CadastrarProduto = ({ titulo = "CADASTRAR" }: { titulo?: string }) => {
  const [categoria, setCategoria] = useState<string>('');
  const [nomeProduto, setNomeProduto] = useState<string>('');
  const [valorProduto, setValorProduto] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [imagem, setImagem] = useState<string | null>(null);

  const categorias: CategoriaType[] = [
    { label: '', value: '' },
    { label: 'Alimentos', value: 'Alimentos' },
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

  return (
    <ScrollView 
      style={styles.containerPrincipal}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header com seta e título */}
      <View style={styles.container}>
        <TouchableOpacity style={styles.botaoEsquerda}>
          <Image 
            source={require('../../assets/images/seta-voltar.png')} 
            style={styles.iconeVoltar} 
          />
        </TouchableOpacity>

        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Image 
            source={require('../../assets/images/icone-menu.png')} 
            style={styles.iconeMenu} 
          />
        </View>
      </View>

      {/* Subtítulo "Informações do Produto" */}
      <View style={styles.subtituloContainer}>
        <Text style={styles.subtitulo}>Informações do Produto</Text>
        <View style={styles.linhaDivisoria} />
      </View>

      {/* Campos do formulário */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome do Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do produto"
          placeholderTextColor="#999"
          value={nomeProduto}
          onChangeText={setNomeProduto}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor do Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor do produto"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={valorProduto}
          onChangeText={setValorProduto}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria do Produto</Text>
        <View style={styles.pickerContainer}>
          {/* Placeholder overlay */}
          {!categoria && (
            <Text style={[styles.pickerPlaceholder, { position: 'absolute', left: 12, zIndex: 1 }]}>
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Imagem do Produto</Text>
        <TouchableOpacity 
          style={[
            styles.fileInput, 
            imagem ? styles.fileInputWithImage : null
          ]} 
          onPress={selecionarImagem}
        >
          <Text style={[
            styles.fileInputText,
            imagem ? styles.fileInputTextWithImage : null
          ]}>
            {imagem ? 'Imagem selecionada (clique para alterar)' : 'Selecione uma imagem'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição do Produto</Text>
        <TextInput
          style={styles.descricaoInput}
          placeholder="Digite a descrição do produto"
          placeholderTextColor="#999"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cadastrarButton}>
          <Text style={styles.cadastrarButtonText}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CadastrarProduto;