import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './style';

type CategoriaType = {
  label: string;
  value: string;
};

const CadastrarProduto = ({ titulo = "CADASTRAR" }: { titulo?: string }) => {
  const [categoria, setCategoria] = useState<string>('');
  const [nomeProduto, setNomeProduto] = useState<string>('');
  const [valorProduto, setValorProduto] = useState<string>('');

  const categorias: CategoriaType[] = [
    { label: 'Selecione uma categoria', value: '' },
    { label: 'Alimentos', value: 'Alimentos' },
    { label: 'Beleza', value: 'Beleza' },
    { label: 'Limpeza', value: 'Limpeza' },
    { label: 'Farmácia', value: 'Farmácia' },
    { label: 'Brinquedos', value: 'Brinquedos' },
  ];

  return (
    <View style={styles.containerPrincipal}>
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

      {/* Campo Nome do Produto */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome do Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o nome do produto"
          placeholderTextColor="#999"
          value={nomeProduto}
          onChangeText={(text: string) => setNomeProduto(text)}
        />
      </View>

      {/* Campo Valor do Produto */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor do Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o valor do produto"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={valorProduto}
          onChangeText={(text: string) => setValorProduto(text)}
        />
      </View>

      {/* Campo Categoria do Produto */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoria}
            onValueChange={(itemValue: string) => setCategoria(itemValue)}
            style={styles.picker}
          >
            {categorias.map((item) => (
              <Picker.Item 
                key={item.value} 
                label={item.label} 
                value={item.value} 
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default CadastrarProduto;