import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';
import ImagePicker from 'expo-image-picker';

import { Title } from '../../components/Title';
import { NavigationBar } from '../../components/NavigationBar';
import { Button } from '../../components/Button';
import { FormProduct } from '../../components/Forms/FormProduct';

import { styles } from './style';

type CategoriaType = {
	label: string;
	value: string;
};

const categorias: CategoriaType[] = [
	{ label: '', value: '' },
	{ label: 'Alimentos', value: 'Alimentos' },
	{ label: 'Beleza', value: 'Beleza' },
	{ label: 'Limpeza', value: 'Limpeza' },
	{ label: 'Farmácia', value: 'Farmácia' },
	{ label: 'Brinquedos', value: 'Brinquedos' },
];

export const CreateProduct = () => {
	const [categoria, setCategoria] = useState<string>('');
	const [nomeProduto, setNomeProduto] = useState<string>('');
	const [valorProduto, setValorProduto] = useState<string>('');
	const [descricao, setDescricao] = useState<string>('');
	const [imagem, setImagem] = useState<string | null>(null);

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
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

				<Title text="Informações do Produto" />

				<FormProduct
					label1="Nome do Produto"
					placeholder1="Digite o nome do produto"
					keyboardType1="default"
					value1={nomeProduto}
					onChangeText1={setNomeProduto}

					label2="Valor do Produto"
					placeholder2="Digite o valor do produto"
					keyboardType2="numeric"
					value2={valorProduto}
					onChangeText2={setValorProduto}

					label3="Categoria do Produto"
					category3={categoria}
					setCategory3={setCategoria}
					categories3={categorias}

					label4="Imagem do Serviço"
					image4={imagem}
					selectImage4={selecionarImagem}


					label5="Descrição do Serviço"
					placeholder5="Descreva o serviço em detalhes"
					keyboardType5="default"
					value5={descricao}
					onChangeText5={setDescricao}
				/>

				<View style={styles.buttonsContainer}>
					<Button icon={require('../../assets/icons/add.png')} text="CADASTRAR SERVIÇO" color="#006316" action={() => { }}  />	
				</View>
			</ScrollView>

			<NavigationBar />
		</SafeAreaView>
	);
};