import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import ImagePicker from 'expo-image-picker';

import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { NavigationBar } from '../../components/NavigationBar';
import { FormCategory } from '../../components/Forms/FormCategory';

import { styles } from './style';

export default function ManageCategory() {
    const [nomeCategoria, setNomeCategoria] = useState<string>('');
    const [imagem, setImagem] = useState<string | null>(null);

    const categoryId = "id";

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
    useEffect(() => {
        const buscarCategoria = async () => {
            try {
                const resposta = await fetch(`http://URL:8080/categoria/${categoryId}/buscar`);
                if (!resposta.ok) {
                    throw new Error('Erro ao buscar categoria');
                }

                const categoria = await resposta.json();
                setNomeCategoria(categoria.name || '');
                setImagem(categoria.pathImage);
            } catch (erro) {
                console.error('Erro ao buscar categoria:', erro);
                Alert.alert('Erro', 'Não foi possível carregar os dados da categoria.');
            }
        };

        buscarCategoria();
    }, []);

    const atualizarCategoria = async () => {
        if (!nomeCategoria || !imagem) {
            Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
            return;
        }

        const categoria = {
            name: nomeCategoria,
            cardColor: "#FF00FF05"
        };

        const formData = new FormData();

        formData.append('category', {
            string: JSON.stringify(categoria),
            name: 'category',
            type: 'application/json',
        } as any);

        formData.append('file', {
            uri: imagem,
            name: 'imagem.jpg',
            type: 'image/jpeg',
        } as any);

        try {
            const response = await fetch(`http://URL:8080/categoria/${categoryId}/atualizar`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                Alert.alert("Sucesso", "Categoria atualizada com sucesso!");
            } else {
                const error = await response.json();
                Alert.alert("Erro", error.message || "Erro ao atualizar a categoria.");
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    };

    const deletarCategoria = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja deletar esta categoria?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Deletar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await fetch(`http://URL:8080/categoria/${categoryId}/deletar`, {
                                method: 'DELETE',
                            });

                            if (response.ok) {
                                Alert.alert('Sucesso', 'Categoria deletada com sucesso!');
                            } else {
                                const erro = await response.json();
                                Alert.alert('Erro', erro.message || 'Erro ao deletar a categoria.');
                            }
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

                <Title text="Informações da Categoria" />

                <FormCategory
                    label1="Nome da Categoria"
                    placeholder1="Insira o nome da categoria"
                    keyboardType1="default"
                    value1={nomeCategoria}
                    onChangeText1={setNomeCategoria}

                    label2="Imagem da Categoria"
                    image2={imagem}
                    selectImage2={selecionarImagem}
                />

                <View style={styles.buttonsContainer}>
                    <Button icon={require('../../assets/icons/delete.png')} text="DELETAR" color="#B40000" action={deletarCategoria} />
                    <Button icon={require('../../assets/icons/edit.png')} text="ATUALIZAR" color="#006516" action={atualizarCategoria} />
                </View>
            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
};