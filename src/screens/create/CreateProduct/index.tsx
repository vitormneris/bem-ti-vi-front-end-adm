import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Title } from '../../../components/Title';
import { NavigationBar } from '../../../components/NavigationBar';
import { Button } from '../../../components/Button';
import { InputDescription } from '../../../components/Inputs/InputDescription';
import { InputImage } from '../../../components/Inputs/InputImage';
import { InputCategory } from '../../../components/Inputs/InputCategory';
import { Input } from '../../../components/Inputs/Input';

import { create, Product } from '../../../api/product/create/create';
import { CategoryFormated, getCategoryList } from '../../../api/category/search/getCategoryList';
import { Category } from '../../../api/category/create/create';

import { styles } from './style';

export const CreateProduct = () => {
	const [nomeProduto, setNomeProduto] = useState<string>('');
	const [valorProduto, setValorProduto] = useState<string>('');
	const [descricaoProduto, setDescricaoProduto] = useState<string>('');
	const [imagem, setImagem] = useState<string | null>(null);
	const [categoriesId, setCategoriesId] = useState<string>('');
	const [categoriesToSelect, setCategoriesToSelect] = useState<CategoryFormated[] | undefined>([]);

	const selecionarImagem = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== 'granted') {
			Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos!');
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: 'images',
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.8,
		});

		if (!result.canceled) {
			setImagem(result.assets[0].uri);
		}
	};

	useEffect(() => {
		async function carregarCategorias() {
			try {
				const categoriesForInput: CategoryFormated[] | undefined = await getCategoryList();
				setCategoriesToSelect(categoriesForInput);
			} catch (error) {
				console.error('Erro ao carregar categorias:', error);
			}
		}
		carregarCategorias();
	}, []);


	const handlePost = async () => {
		const category: Category = { id: categoriesId, name: "", pathImage: "", cardColor: "" };
		const produto: Product = {
			id: null,
			name: nomeProduto,
			price: parseFloat(valorProduto),
			pathImage: imagem,
			description: descricaoProduto,
			categories: [
				category
			],
		};

		try {
			const success = await create(produto, imagem);
			if (success) {
				setCategoriesId('');
				setNomeProduto('');
				setValorProduto('');
				setDescricaoProduto('');
				setImagem(null);
				Alert.alert('Sucesso!', 'O produto foi cadastrado.');
			}
		} catch (error) {
			console.error('POST request failed:', error);
			Alert.alert('Erro', 'Não foi possível cadastrar o produto.');
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

				<Title text="Informações do Produto" />

				<Input
					label="Nome do Produto"
					placeholder="Digite o nome do produto"
					keyboardType="default"
					value={nomeProduto}
					onChangeText={setNomeProduto}
				/>

				<Input
					label="Valor do Produto"
					placeholder="Digite o valor do produto"
					keyboardType="numeric"
					value={valorProduto}
					onChangeText={setValorProduto}
				/>

				<InputCategory
					label="Categoria do Produto"
					category={categoriesId}
					setCategory={setCategoriesId}
					categoriesToSelect={categoriesToSelect}
				/>

				<InputImage
					label="Imagem do Produto"
					image={imagem}
					selectImage={selecionarImagem}
				/>

				<InputDescription
					label="Descrição do Produto"
					placeholder="Descreva o produto em detalhes"
					keyboardType="default"
					value={descricaoProduto}
					onChangeText={setDescricaoProduto}
				/>

				<View style={styles.buttonsContainer}>
					<Button 
						icon={require('../../../assets/icons/add.png')} 
						text="CADASTRAR PRODUTO" 
						color="#006316" 
						action={handlePost} 
					/>
				</View>
			</ScrollView>

			<NavigationBar initialTab='loja' />
		</SafeAreaView>
	);
};