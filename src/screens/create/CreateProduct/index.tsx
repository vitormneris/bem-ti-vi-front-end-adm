import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

import { Title } from '../../../components/Title';
import { NavigationBar } from '../../../components/NavigationBar';
import { Button } from '../../../components/Button';
import { InputDescription } from '../../../components/Inputs/InputDescription';
import { InputImage } from '../../../components/Inputs/InputImage';
import { InputCategory } from '../../../components/Inputs/InputCategory';
import { Input } from '../../../components/Inputs/Input';

import { create } from '../../../api/product/create/create';
import { findAll } from '../../../api/category/search/findAll';
import { Error,Product,CategoryFormated,Category } from '../../../utils/Types';

import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';
import { selectImageFromGalery } from '../../../utils/selectImageFromGalery/selectImageFromGalery';

import { styles } from './style';
import { ButtonLarge } from '../../../components/ButtonLarge';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../routes/AppRoute';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../../components/ErrorModal';

export const CreateProduct = () => {
	const { navigate } = useNavigation<NavigationProps>();

	const [nomeProduto, setNomeProduto] = useState<string>('');
	const [valorProduto, setValorProduto] = useState<string>('');
	const [descricaoProduto, setDescricaoProduto] = useState<string>('');
	const [imagem, setImagem] = useState<string>('');
	const [categoriesIds, setCategoriesIds] = useState<string[]>([]);
	const [categoriesToSelect, setCategoriesToSelect] = useState<CategoryFormated[]>([]);

	const [error, setError] = useState<string>('');
	const [fields, setFields] = useState<string[]>([]);
	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);

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
					setErrorModalVisible(true);
				}
			} catch {
				setError('Não foi possível atualizar. Verifique sua conexão.');
				setErrorModalVisible(true);
			}
		}
		carregarCategorias();
	}, []);


	const sendRequestCreate = async () => {
		setLoading(true);
		const categoriasSelecionadas: Category[] = categoriesIds.map(id => ({
			id,
			name: "",
			pathImage: "",
			cardColor: ""
		}));
		const produto: Product = {
			id: null,
			name: nomeProduto,
			price: parseFloat(valorProduto),
			pathImage: imagem,
			description: descricaoProduto,
			categories: categoriasSelecionadas,
			activationStatus:null
		};

		try {
			const success = await create(produto, imagem);


			if (typeof success === "boolean") {
				if (success) {
					setCategoriesIds([]);
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
				setFields(
                    Array.isArray(success.errorFields) 
                    ? success.errorFields.map(field => field.description) 
                    : []
                );
				setErrorModalVisible(true);
			}


		} catch (error) {
			setError('Não foi possível atualizar. Verifique sua conexão.');
			setErrorModalVisible(true);
		}finally {
			setLoading(false);
		}
	};

	return (
	<KeyboardAvoidingView
		behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		style={{ flex: 1 }}>

		<SafeAreaView style={styles.safeArea}>
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
					label="Categorias"
					selectedCategories={categoriesIds}
					setSelectedCategories={setCategoriesIds}
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

				{loading ? (
					<ActivityIndicator size="large" color="#256489" style={{ marginTop: 20 }} />
				):
				categoriesToSelect.length >= 1 ? (
					<View style={styles.buttonsContainer}>
						{<ButtonLarge
							icon={require('../../../assets/icons/add.png')}
							text="CADASTRAR PRODUTO"
							color="#006316"
							action={sendRequestCreate}
						/>}
					</View>
				): (
					<Text style={styles.warningText}>Para criar um produto você deverá ter ao menos uma categoria criada!</Text>
				)
				}
				<ErrorModal
					visible={errorModalVisible}
					error={error}
					fields={fields}
					onClose={() => setErrorModalVisible(false)}
				/>	
			</ScrollView>

		</SafeAreaView>
	</KeyboardAvoidingView>
	);
};