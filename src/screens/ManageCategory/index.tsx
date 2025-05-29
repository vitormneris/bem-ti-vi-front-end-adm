import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import ImagePicker from 'expo-image-picker';

import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { NavigationBar } from '../../components/NavigationBar';
import { FormCategory } from '../../components/Forms/FormCategory';
import ColorPickerModal from "../../components/ColorPickerModal";

import { findById } from '../../api/category/search/findById';
import { deleteById } from '../../api/category/delete/deleteById';
import { update } from '../../api/category/update/update';

import { NavigationProps } from '../../routes/index';

import { styles } from './style';

export default function ManageCategory() {
    const { navigate } = useNavigation<NavigationProps>();
    const route = useRoute();
    const { id: categoryId } = route.params as { id: string };
    const [nomeCategoria, setNomeCategoria] = useState<string>('');
    const [corCard, setCorCard] = useState<string>('#8b5cf6');
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [imagem, setImagem] = useState<string | null>(null);

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
        const buscarCategoria = async () => {
            try {
                const data = await findById(categoryId);
                if (!data) {
                    throw new Error('Erro ao buscar categoria');
                }

                setNomeCategoria(data.name || '');
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
            pathImage: "",
            cardColor: corCard
        };

        try {
            const success = await update(categoria, imagem, categoryId);

            if (success) {
                Alert.alert("Sucesso!", "A categoria foi atualizada.");
                navigate('SearchCategory')
            }

        } catch (error) {
            console.error('UPDATE request failed:', error);
            Alert.alert("Erro!", "Falha ao atualizar a categoria.");
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir esta categoria?',
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
        console.error('Erro ao excluir:', error);
        Alert.alert('Erro', 'Não foi possível excluir a categoria.');
    }
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
                <View style={{ marginVertical: 20 }}>
                    <Button
                        icon={require('../../assets/icons/edit.png')}
                        text="  Escolher cor"
                        color={corCard}
                        action={() => setColorModalVisible(true)}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <Button icon={require('../../assets/icons/delete.png')} text="DELETAR" color="#B40000" action={handleDelete} />
                    <Button icon={require('../../assets/icons/edit.png')} text="ATUALIZAR" color="#006516" action={handleUpdate} />
                </View>
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
            <NavigationBar initialTab='categorias'/>
        </SafeAreaView>
    );
};