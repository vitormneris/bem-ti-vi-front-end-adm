import React, { useState } from "react";
import { View, Alert, ScrollView, SafeAreaView, Text } from 'react-native';

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

    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);

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

            if (typeof success === "boolean") {
                if (success) {
                    setNomeCategoria('');
                    setCorCard('#8b5cf6');
                    setImagem('');
                    setError('');
                    setFields([]);
                    Alert.alert('Sucesso!', 'A categoria foi cadastrada.');
                }
            } else {
                setError(success.message || "Erro desconhecido.");

                setFields(success.errorFields?.map(field => field.description) || []);
            }
        } catch (error) {
            setError('Não foi possível atualizar. Verifique sua conexão.');
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

            <NavigationBar initialTab="categorias" />
        </SafeAreaView>
    );
};