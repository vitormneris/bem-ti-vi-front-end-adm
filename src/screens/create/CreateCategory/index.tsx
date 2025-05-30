import React, { useState } from "react";
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import ImagePicker from "expo-image-picker";

import { Title } from "../../../components/Title";
import { NavigationBar } from "../../../components/NavigationBar";
import { Button } from "../../../components/Button";
import ColorPickerModal from "../../../components/ColorPickerModal";
import { Input } from "../../../components/Inputs/Input";
import { InputImage } from "../../../components/Inputs/InputImage";

import { Category, create } from "../../../api/category/create/create";

import { styles } from "./style";

export const CreateCategory = () => {
    const [nomeCategoria, setNomeCategoria] = useState<string>("");
    const [corCard, setCorCard] = useState<string>("#8b5cf6");
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [imagem, setImagem] = useState<string | null>(null);

    const selecionarImagem = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImagem(result.assets[0].uri);
        }
    };

    const handlePost = async () => {
        const categoria: Category = {
            id: null,
            name: nomeCategoria,
            pathImage: "",
            cardColor: corCard,
        };

        try {
            const success = await create(categoria, imagem);
            if (success) {
                setNomeCategoria('')
                setCorCard('#8b5cf6')
                setImagem(null)
                Alert.alert('Sucesso!', 'A categoria foi cadastrada.')
            }
        } catch (error) {
            console.error('POST request failed:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar a categoria.');
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
                    <Button 
                        icon={require('../../../assets/icons/add.png')} 
                        text="CADASTRAR SERVIÇO" 
                        color="#006316" 
                        action={handlePost} 
                    />
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

            <NavigationBar initialTab="categorias" />
        </SafeAreaView>
    );
};