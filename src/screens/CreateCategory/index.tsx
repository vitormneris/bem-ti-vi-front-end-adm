import React, { useState } from "react";
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import ImagePicker from "expo-image-picker";

import { Title } from "../../components/Title";
import { NavigationBar } from "../../components/NavigationBar";
import { Button } from "../../components/Button";
import { FormCategory } from "../../components/Forms/FormCategory";

import { styles } from "./style";

export const CreateCategory = () => {
    const [nomeCategoria, setNomeCategoria] = useState<string>("");
    const [imagem, setImagem] = useState<string | null>(null);

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

    const handleSubmit = async () => {
        if (!nomeCategoria.trim() || !imagem) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("category", {
                uri: `data:application/json;base64,${btoa(
                    JSON.stringify({
                        name: nomeCategoria,
                        cardColor: "#FF00FF05",
                    })
                )}`,
                type: "application/json",
                name: "category.json",
            } as any);

            formData.append("file", {
                uri: imagem,
                type: "image/jpeg",
                name: "categoria.jpg",
            } as any);

            const response = await fetch(
                "http://URL:8080/categoria/inserir",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Erro no response:", errorText);
                throw new Error("Erro ao cadastrar categoria");
            }

            Alert.alert("Sucesso", "Categoria cadastrada!");
            setNomeCategoria("");
            setImagem(null);
        } catch (error: any) {
            console.error("Erro detalhado:", error);
            Alert.alert("Erro", error.message || "Falha ao cadastrar");
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

                <View style={styles.buttonsContainer}>
                    <Button icon={require('../../assets/icons/add.png')} text="CADASTRAR SERVIÇO" color="#006316" action={handleSubmit} />
                </View>
            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
};