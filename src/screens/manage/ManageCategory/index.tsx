import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import ColorPickerModal from '../../../components/ColorPickerModal';
import { InputImage } from '../../../components/Inputs/InputImage';
import { Input } from '../../../components/Inputs/Input';

import { findById } from '../../../api/category/search/findById';
import { deleteById } from '../../../api/category/delete/deleteById';
import { update } from '../../../api/category/update/update';

import { NavigationProps } from "../../../routes/AppRoute";

import { selectImageFromGalery } from '../../../utils/selectImageFromGalery/selectImageFromGalery';
import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';

import { styles } from './style';

export default function ManageCategory() {
    const { navigate } = useNavigation<NavigationProps>();
    const route = useRoute();
    const { id: categoryId } = route.params as { id: string };

    const [nomeCategoria, setNomeCategoria] = useState<string>('');
    const [corCard, setCorCard] = useState<string>('#8b5cf6');
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [imagem, setImagem] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);

    useValidateToken();

    const selecionarImagem = async () => {
        const imageSelected = await selectImageFromGalery();
        if (imageSelected) {
            setImagem(imageSelected);
        }
    };

    useEffect(() => {
        const buscarCategoria = async () => {
            try {
                const data = await findById(categoryId);
                if (!data) {
                    throw new Error('Erro ao buscar categoria');
                }

                setNomeCategoria(data.name);
                setImagem(data.pathImage);
                setCorCard(data.cardColor);
            } catch (erro) {
                console.error('Erro ao buscar categoria:', erro);
                Alert.alert('Erro', 'Não foi possível carregar os dados da categoria.');
            }
        };

        buscarCategoria();
    }, [categoryId]);

    const handleUpdate = async () => {
        if (!nomeCategoria || !imagem || !corCard) {
            Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
            return;
        }

        const categoria = {
            id: categoryId,
            name: nomeCategoria,
            cardColor: corCard,
            pathImage: "",
        };

        try {
            const result = await update(categoria, imagem, categoryId);

            if (typeof result === "boolean") {
                if (result) {
                    Alert.alert("Sucesso!", "O serviço foi atualizado.");
                    navigate('SearchService');
                }
            } else {
                setError(result.message || "Erro desconhecido.");
                setFields(result.errorFields?.map(field => field.description) || []);
            }

        } catch (error) {
            setError('Não foi possível atualizar o produto. Verifique sua conexão.');
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            'Atenção!',
            'Tem certeza que deseja excluir esta categoria?\n\nA deleção desta categoria provacará a exclusão de todos os produtos assossiados a ela.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => confirmDelete(categoryId),
                },
            ]
        );
    };

    const confirmDelete = async (categoryId: string) => {
        try {
            const success = await deleteById(categoryId);

            if (success) {
                Alert.alert('Sucesso!', 'A categoria foi excluída.');
                navigate('SearchCategory')
            }

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir a categoria.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

                <Title text="Informações da Categoria" />

                <Input
                    label="Nome da Categoria"
                    placeholder="Insira o nome da categoria"
                    keyboardType="default"
                    value={nomeCategoria}
                    onChangeText={setNomeCategoria}
                />

                <InputImage
                    label="Imagem da Categoria"
                    image={imagem}
                    selectImage={selecionarImagem}
                />

                <View style={{ marginVertical: 20 }}>
                    <Button
                        icon={require('../../../assets/icons/edit.png')}
                        text="  Escolher cor"
                        color={corCard}
                        action={() => setColorModalVisible(true)}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <Button icon={require('../../../assets/icons/delete.png')} text="DELETAR" color="#B40000" action={handleDelete} />
                    <Button icon={require('../../../assets/icons/edit.png')} text="ATUALIZAR" color="#006516" action={handleUpdate} />
                </View>

                {error ? (
                    <View style={{ marginVertical: 10, alignSelf: 'center' }}>
                        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
                        {fields.map((field, index) => (
                            <Text key={index} style={{ color: 'red', textAlign: 'center' }}>• {field}</Text>
                        ))}
                    </View>
                ) : null}
            </ScrollView>

            <ColorPickerModal
                visible={colorModalVisible}
                initialColor={corCard}
                onClose={() => setColorModalVisible(false)}
                onColorSelect={(corSelecionada: string) => {
                    setCorCard(corSelecionada);
                    setColorModalVisible(false);
                }}
            />

            <NavigationBar initialTab='categorias' />
        </SafeAreaView>
    );
};