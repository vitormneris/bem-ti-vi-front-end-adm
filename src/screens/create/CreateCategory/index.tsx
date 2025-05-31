import React, { useState } from "react";
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import { Title } from "../../../components/Title";
import { NavigationBar } from "../../../components/NavigationBar";
import { Button } from "../../../components/Button";
import ColorPickerModal from "../../../components/ColorPickerModal";
import { Input } from "../../../components/Inputs/Input";
import { InputImage } from "../../../components/Inputs/InputImage";

import { Category, create } from "../../../api/category/create/create";

import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';
import { selectImageFromGalery } from "../../../utils/selectImageFromGalery/selectImageFromGalery";

import { styles } from "./style";

export const CreateCategory = () => {
    const [nomeCategoria, setNomeCategoria] = useState<string>("");
    const [corCard, setCorCard] = useState<string>("#8b5cf6");
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [imagem, setImagem] = useState<string>('');

    useValidateToken();

    const selecionarImagem = async () => {
        const imageSelected = await selectImageFromGalery();
        if (imageSelected) {
            setImagem(imageSelected);
        }
    };

    const sendRequestCreate = async () => {
        const categoria: Category = {
            id: "",
            name: nomeCategoria,
            pathImage: "",
            cardColor: corCard,
        };

        try {
            const success = await create(categoria, imagem);
            if (success) {
                setNomeCategoria('');
                setCorCard('#8b5cf6');
                setImagem('');
                Alert.alert('Sucesso!', 'A categoria foi cadastrada.');
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
                        action={sendRequestCreate} 
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