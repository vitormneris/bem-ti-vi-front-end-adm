import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { InputDescription } from '../../../components/Inputs/InputDescription';
import { InputImage } from '../../../components/Inputs/InputImage';
import { InputCategory } from '../../../components/Inputs/InputCategory';
import { Input } from '../../../components/Inputs/Input';

import { findById } from '../../../api/product/search/findById';
import { deleteById } from '../../../api/product/delete/deleteById';
import { update } from '../../../api/product/update/update';
import { findAll } from '../../../api/category/search/findAll';
import { Product,Category,CategoryFormated,Error } from '../../../utils/Types';

import { NavigationProps } from "../../../routes/AppRoute";

import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';
import { selectImageFromGalery } from '../../../utils/selectImageFromGalery/selectImageFromGalery';

import { styles } from './style';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../../components/ErrorModal';

export default function ManageProduct() {
    const { navigate } = useNavigation<NavigationProps>();
    const route = useRoute();
    const { id: productId } = route.params as { id: string };

    const [nomeProduto, setNomeProduto] = useState<string>('');
    const [valorProduto, setValorProduto] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
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
        try {
            const imageSelected = await selectImageFromGalery();
            if (imageSelected) {
                setImagem(imageSelected);
            }
        } catch (error) {
            setError(`Erro ao selecionar imagem: ${error}`);
            setErrorModalVisible(true);
        }
    };

    useEffect(() => {
        const carregarProduto = async () => {
            try {
                const produto: Product | undefined = await findById(productId);
                if (!produto) {
                    setError('Erro')
                    setFields(['Produto não encontrado.']);
                    setErrorModalVisible(true);
                    navigate('SearchProduct');
                    return;
                }

                const categoriesForInput: CategoryFormated[] | Error = await findAll();
                if (Array.isArray(categoriesForInput)) {
                    setCategoriesToSelect(categoriesForInput);
                } else {
                    setError(categoriesForInput.message);
                    setErrorModalVisible(true);
                }

                setNomeProduto(produto.name);
                setValorProduto(String(produto.price));
                setDescricao(produto.description);
                setImagem(produto.pathImage);

                const selectedCategoryIds = produto.categories.map(c => c.id);
                setCategoriesIds(selectedCategoryIds);

            } catch (error) {
                setError('Não foi possível atualizar. Verifique sua conexão.');
                setErrorModalVisible(true);

            }
        };

        carregarProduto();
    }, [productId, navigate]);

    const handleUpdate = async () => {
        setLoading(true);
        if (!nomeProduto.trim() || !valorProduto.trim() || !descricao.trim() || !categoriesIds) {
            Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
            return;
        }

        const preco = parseFloat(valorProduto.replace(',', '.'));
        if (isNaN(preco)) {
            Alert.alert("Valor inválido", "Insira um valor numérico válido para o preço.");
            return;
        }

        const categoriasSelecionadas: Category[] = categoriesIds.map(id => ({
            id,
            name: "",
            pathImage: "",
            cardColor: ""
        }));

        const produtoAtualizado: Product = {
            id: productId,
            name: nomeProduto,
            price: preco,
            pathImage: imagem,
            description: descricao,
            categories: categoriasSelecionadas,
            activationStatus:null
        };

        try {
            const result = await update(produtoAtualizado, imagem, productId);

            if (typeof result === "boolean") {
                if (result) {
                    Alert.alert("Sucesso!", "O produto foi atualizado.");
                    navigate('SearchProduct');
                }
            } else {
                setError(result.message || "Erro desconhecido.");
                setFields(
                    Array.isArray(result.errorFields) 
                    ? result.errorFields.map(field => field.description) 
                    : []
                );
                setErrorModalVisible(true);
            }

        } catch (error) {
            setError('Não foi possível atualizar o produto. Verifique sua conexão.');
            setErrorModalVisible(true);
        }finally {
			setLoading(false);
		}
    };

    const handleDelete = () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este produto?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => confirmDelete(productId),
                },
            ]
        );
    };

    const confirmDelete = async (id: string) => {
        try {
            const success = await deleteById(id);

            if (success) {
                Alert.alert('Sucesso!', 'O produto foi excluído.');
                navigate('SearchProduct');
            }
        } catch (error) {
            setError(`Erro ao excluir produto: ${error}`);
            setFields(['Não foi possível excluir o produto.']);
            setErrorModalVisible(true);
        }
    };

    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <Title text="Atualize este produto" />

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

                <InputImage
                    label="Imagem"
                    image={imagem}
                    selectImage={selecionarImagem}
                />

                <InputCategory
                    label="Categorias"
					selectedCategories={categoriesIds}
					setSelectedCategories={setCategoriesIds}
					categoriesToSelect={categoriesToSelect}
                />

                <InputDescription
                    label="Descrição"
                    placeholder="Descreva o produto em detalhes"
                    keyboardType="default"
                    value={descricao}
                    onChangeText={setDescricao}
                />

                {loading ? (
					<ActivityIndicator size="large" color="#256489" style={{ marginTop: 20 }} />
				):
                <View style={styles.buttonsContainer}>
                    <Button
                        icon={require('../../../assets/icons/delete.png')}
                        text="DELETAR"
                        color="#B40000"
                        action={handleDelete}
                    />
                    <Button
                        icon={require('../../../assets/icons/edit.png')}
                        text="ATUALIZAR"
                        color="#006516"
                        action={handleUpdate}
                    />
                </View>
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
}
