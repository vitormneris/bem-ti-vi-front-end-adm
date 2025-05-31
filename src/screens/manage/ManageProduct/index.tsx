import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

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
    const [categoriesToSelect, setCategoriesToSelect] = useState<CategoryFormated[] | undefined>([]);

    useValidateToken();

    const selecionarImagem = async () => {
        const imageSelected = await selectImageFromGalery();
        if (imageSelected) {
            setImagem(imageSelected);
        }
    };


    useEffect(() => {
        const buscarProduto = async () => {
            try {
                const data: Product | undefined = await findById(productId);
                if (!data) {
                    throw new Error('Erro ao buscar produto');
                }

                const categoriesToSelect: CategoryFormated[] | undefined = await findAll();

                const selectedCategories = data.categories;

                const selectedCategoriesFormated: string[] = selectedCategories.map((item: Category) => (item.id == null) ? '' : item.id)

                setCategoriesToSelect(categoriesToSelect);
                setNomeProduto(data.name);
                setValorProduto(String(data.price));
                setDescricao(data.description);
                setCategoriesId(selectedCategoriesFormated[0]);
                setImagem(data.pathImage);
            } catch (erro) {
                console.error('Erro ao buscar produto:', erro);
                Alert.alert('Erro', 'Não foi possível carregar os dados do produto.');
            }
        };

        buscarProduto();
    }, [productId]);

    const handleUpdate = async () => {
        if (!nomeProduto || !valorProduto || !descricao || !categoriesId) {
            Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
            return;
        }

        const category: Category = { id: categoriesId , name: "", pathImage: "", cardColor: "" };
        const produto: Product = {
            id: productId,
            name: nomeProduto,
            price: parseFloat(valorProduto),
            pathImage: imagem,
            description: descricao,
            categories: [
                category
            ],
        };

        try {
            const success = await update(produto, imagem, productId)

            if (success) {
                Alert.alert("Sucesso!", "O produto foi atualizado.");
                navigate('SearchProduct')
            }

        } catch (error) {
            console.error('UPDATE request failed:', error);
            Alert.alert('Erro!', 'Falha ao atualizar o produto.');
        }
    };

    const handleDelete = async () => {
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

    const confirmDelete = async (productId: string) => {
        try {
            const success = await deleteById(productId);

            if (success) {
                Alert.alert('Sucesso!', 'O produto foi excluído.');
                navigate('SearchProduct')
            }

        } catch (error) {
            console.error('Erro ao excluir:', error);
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
                    <Button icon={require('../../../assets/icons/delete.png')} text="DELETAR" color="#B40000" action={handleDelete} />
                    <Button icon={require('../../../assets/icons/edit.png')} text="ATUALIZAR" color="#006516" action={handleUpdate} />
                </View>
            </ScrollView>

            <NavigationBar initialTab='loja' />
        </SafeAreaView>
    );
};