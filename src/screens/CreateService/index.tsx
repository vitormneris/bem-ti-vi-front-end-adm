import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';
import ImagePicker from 'expo-image-picker';

import { Title } from '../../components/Title';
import { NavigationBar } from '../../components/NavigationBar';
import { Button } from '../../components/Button';
import { FormService } from '../../components/Forms/FormService';

import { styles } from './style';

export const CreateService = () => {
    const [nomeServico, setNomeServico] = useState<string>('');
    const [descricaoServico, setDescricaoServico] = useState<string>('');
    const [precoServico, setPrecoServico] = useState<string>('');
    const [duracaoEstimada, setDuracaoEstimada] = useState<string>('');
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

    const handleCadastrarServico = async () => {
        if (!nomeServico || !precoServico || !duracaoEstimada || !descricaoServico || !imagem) {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos e selecione uma imagem');
            return;
        }

        try {
            const servico = {
                name: nomeServico,
                price: parseFloat(precoServico),
                estimated_duration: duracaoEstimada,
                description: descricaoServico,
            };

            const formData = new FormData();

            formData.append('service', {
                string: JSON.stringify(servico),
                name: 'service',
                type: 'application/json',
            } as any);

            formData.append('file', {
                uri: imagem,
                name: 'imagem.jpg',
                type: 'image/jpeg',
            } as any);

            const response = await fetch('http://URL:8080/service/inserir', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Serviço cadastrado com sucesso!');
                setNomeServico('');
                setPrecoServico('');
                setDuracaoEstimada('');
                setDescricaoServico('');
                setImagem(null);
            } else {
                const errorData = await response.json();
                console.error('Erro no cadastro:', errorData);
                Alert.alert('Erro', errorData.message || 'Erro ao cadastrar serviço');
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
            Alert.alert('Erro', 'Erro de rede ou erro interno.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

                <Title text="Informações do Serviço" />

                <FormService
                    label1="Nome do Serviço"
                    placeholder1="Digite o nome do serviço"
                    keyboardType1="default"
                    value1={nomeServico}
                    onChangeText1={setNomeServico}

                    label2="Preço do Serviço"
                    placeholder2="Digite o valor do serviço"
                    keyboardType2="numeric"
                    value2={precoServico}
                    onChangeText2={setPrecoServico}

                    label3="Duração Estimada"
                    placeholder3="Ex: 03:30:00"
                    keyboardType3="default"
                    value3={duracaoEstimada}
                    onChangeText3={setDuracaoEstimada}

                    label4="Imagem do Serviço"
                    image4={imagem}
                    selectImage4={selecionarImagem}


                    label5="Descrição do Serviço"
                    placeholder5="Descreva o serviço em detalhes"
                    keyboardType5="default"
                    value5={descricaoServico}
                    onChangeText5={setDescricaoServico}
                />

                <View style={styles.buttonsContainer}>
                    <Button icon={require('../../assets/icons/add.png')} text="CADASTRAR SERVIÇO" color="#006316" action={handleCadastrarServico} />
                </View>
            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
};
