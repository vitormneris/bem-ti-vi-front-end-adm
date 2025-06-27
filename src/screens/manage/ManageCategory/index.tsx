import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

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
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../../components/ErrorModal';

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
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    useValidateToken();
    hardwareBackPress(navigate, "SearchCategory");

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
                setError(`Erro ao buscar categoria: ${erro}`);
                setFields(['Não foi possível carregar os dados.']);
                setErrorModalVisible(true);
            }
        };

        buscarCategoria();
    }, [categoryId]);

    const handleUpdate = async () => {
        setLoading(true);
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
            setError('Erro')
            setFields(['Não foi possível excluir a categoria.']);
            setErrorModalVisible(true);
        }
    };

    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <Title text="Atualize esta categoria" />

                <Input
                    label="Nome"
                    placeholder="Insira o nome"
                    keyboardType="default"
                    value={nomeCategoria}
                    onChangeText={setNomeCategoria}
                />

                <InputImage
                    label="Imagem"
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

            <ColorPickerModal
                visible={colorModalVisible}
                initialColor={corCard}
                onClose={() => setColorModalVisible(false)}
                onColorSelect={(corSelecionada: string) => {
                    setCorCard(corSelecionada);
                    setColorModalVisible(false);
                }}
            />

        </SafeAreaView>
    </KeyboardAvoidingView>
    );
};