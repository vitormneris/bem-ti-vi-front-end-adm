import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text } from 'react-native';
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
import { CategoryFormated, findAll } from '../../../api/category/search/findAll';
import { Category } from '../../../api/category/create/create';
import { Product } from '../../../api/product/create/create';

import { NavigationProps } from "../../../routes/AppRoute";

import { styles } from './style';
import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';
import { selectImageFromGalery } from '../../../utils/selectImageFromGalery/selectImageFromGalery';

export default function ManageProduct() {
    const { navigate } = useNavigation<NavigationProps>();
    const route = useRoute();
    const { id: productId } = route.params as { id: string };

    const [nomeProduto, setNomeProduto] = useState<string>('');
    const [valorProduto, setValorProduto] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [imagem, setImagem] = useState<string>('');
    const [categoriesId, setCategoriesId] = useState<string>('');
    const [categoriesToSelect, setCategoriesToSelect] = useState<CategoryFormated[]>([]);

    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);

    useValidateToken();

    const selecionarImagem = async () => {
        try {
            const imageSelected = await selectImageFromGalery();
            if (imageSelected) {
                setImagem(imageSelected);
            }
        } catch (error) {
            console.error('Erro ao selecionar imagem:', error);
        }
    };

    useEffect(() => {
        const carregarProduto = async () => {
            try {
                const produto: Product | undefined = await findById(productId);
                if (!produto) {
                    Alert.alert('Erro', 'Produto não encontrado.');
                    navigate('SearchProduct');
                    return;
                }

                const categorias: CategoryFormated[] | undefined = await findAll();
                setCategoriesToSelect(categorias || []);

                setNomeProduto(produto.name);
                setValorProduto(String(produto.price));
                setDescricao(produto.description);
                setImagem(produto.pathImage);

                const selectedCategoryId = produto.categories[0]?.id ?? '';
                setCategoriesId(selectedCategoryId);

            } catch (error) {
                console.error('Erro ao carregar produto:', error);
                Alert.alert('Erro', 'Não foi possível carregar o produto.');
            }
        };

        carregarProduto();
    }, [productId, navigate]);

    const handleUpdate = async () => {
        if (!nomeProduto.trim() || !valorProduto.trim() || !descricao.trim() || !categoriesId.trim()) {
            Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
            return;
        }

        const preco = parseFloat(valorProduto.replace(',', '.'));
        if (isNaN(preco)) {
            Alert.alert("Valor inválido", "Insira um valor numérico válido para o preço.");
            return;
        }

        const categoria: Category = {
            id: categoriesId,
            name: "",
            pathImage: "",
            cardColor: ""
        };

        const produtoAtualizado: Product = {
            id: productId,
            name: nomeProduto,
            price: preco,
            pathImage: imagem,
            description: descricao,
            categories: [categoria]
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
                setFields(result.errorFields?.map(field => field.description) || []);
            }

        } catch (error) {
            setError('Não foi possível atualizar o produto. Verifique sua conexão.');
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
            console.error('Erro ao excluir produto:', error);
            Alert.alert('Erro', 'Não foi possível excluir o produto.');
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
                    value={descricao}
                    onChangeText={setDescricao}
                />

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

                {error ? (
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.error}>{error}</Text>
                        {fields.map((field, index) => (
                            <Text key={index} style={styles.field}>• {field}</Text>
                        ))}
                    </View>
                ) : null}

            </ScrollView>

            <NavigationBar initialTab='loja' />
        </SafeAreaView>
    );
}
