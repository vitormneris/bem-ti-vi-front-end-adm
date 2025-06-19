import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text } from 'react-native';

import { Title } from '../../../components/Title';
import { NavigationBar } from '../../../components/NavigationBar';
import { Button } from '../../../components/Button';
import { InputDescription } from '../../../components/Inputs/InputDescription';
import { InputImage } from '../../../components/Inputs/InputImage';
import { InputCategory } from '../../../components/Inputs/InputCategory';
import { Input } from '../../../components/Inputs/Input';

import { create, Product } from '../../../api/product/create/create';
import { CategoryFormated, findAll } from '../../../api/category/search/findAll';
import { Category } from '../../../api/category/create/create';
import { Error } from '../../../api/product/update/update';

import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';
import { selectImageFromGalery } from '../../../utils/selectImageFromGalery/selectImageFromGalery';

import { styles } from './style';
import { ButtonLarge } from '../../../components/ButtonLarge';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../routes/AppRoute';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';

export const CreateProduct = () => {
	const { navigate } = useNavigation<NavigationProps>();

	const [nomeProduto, setNomeProduto] = useState<string>('');
	const [valorProduto, setValorProduto] = useState<string>('');
	const [descricaoProduto, setDescricaoProduto] = useState<string>('');
	const [imagem, setImagem] = useState<string>('');
	const [categoriesId, setCategoriesId] = useState<string>('');
	const [categoriesToSelect, setCategoriesToSelect] = useState<CategoryFormated[]>([]);

	const [error, setError] = useState<string>('');
	const [fields, setFields] = useState<string[]>([]);

	useValidateToken();
	hardwareBackPress(navigate, "SearchProduct");

	const selecionarImagem = async () => {
		const imageSelected = await selectImageFromGalery();
		if (imageSelected) {
			setImagem(imageSelected);
		}
	};

	useEffect(() => {
		async function carregarCategorias() {
			try {
				const categoriesForInput: CategoryFormated[] | Error = await findAll();

				if (Array.isArray(categoriesForInput)) {
					setCategoriesToSelect(categoriesForInput);
				} else {
					setError(categoriesForInput.message);
				}
			} catch {
				setError('Não foi possível atualizar. Verifique sua conexão.');
			}
		}
		carregarCategorias();
	}, []);


	const sendRequestCreate = async () => {
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


			if (typeof success === "boolean") {
				if (success) {
					setCategoriesId('');
					setNomeProduto('');
					setValorProduto('');
					setDescricaoProduto('');
					setImagem('');
					setError('');
					setFields([]);
					Alert.alert('Sucesso!', 'O produto foi cadastrado.');
				}
			} else {
				setError(success.message || "Erro desconhecido.");

				setFields(success.errorFields?.map(field => field.description) || []);
			}


		} catch (error) {
			setError('Não foi possível atualizar. Verifique sua conexão.');
		}
	};

	return (
		<View style={styles.safeArea}>
			<ScrollView>

				<Title text="Cadastre um novo produto" />

				<Input
					label="Nome"
					placeholder="Digite o nome aqui"
					keyboardType="default"
					value={nomeProduto}
					onChangeText={setNomeProduto}
				/>

				<Input
					label="Valor"
					placeholder="Digite o valor aqui"
					keyboardType="numeric"
					value={valorProduto}
					onChangeText={setValorProduto}
				/>

				<InputCategory
					label="Categoria"
					category={categoriesId}
					setCategory={setCategoriesId}
					categoriesToSelect={categoriesToSelect}
				/>

				<InputImage
					label="Imagem"
					image={imagem}
					selectImage={selecionarImagem}
				/>

				<InputDescription
					label="Descrição"
					placeholder="Descreva o produto em detalhes"
					keyboardType="default"
					value={descricaoProduto}
					onChangeText={setDescricaoProduto}
				/>

				{categoriesToSelect.length >= 1 ? (
					<View style={styles.buttonsContainer}>
						<ButtonLarge
							icon={require('../../../assets/icons/add.png')}
							text="CADASTRAR PRODUTO"
							color="#006316"
							action={sendRequestCreate}
						/>
					</View>
				): (
					<Text style={styles.warningText}>Para criar um produto você deverá ter ao menos uma categoria criada!</Text>
				)}

				{error ? (
					<View style={{ marginVertical: 10, alignSelf: 'center' }}>
						<Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
						{fields.map((field, index) => (
							<Text key={index} style={{ color: 'red', textAlign: 'center' }}>• {field}</Text>
						))}
					</View>
				) : null}
			</ScrollView>

		</View>
	);
};