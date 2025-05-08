import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import ImagePicker from 'expo-image-picker';

import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { NavigationBar } from '../../components/NavigationBar';
import { FormService } from '../../components/Forms/FormService';

import { styles } from './style';

export default function ManageService() {
    const [nomeServico, setNomeServico] = useState<string>('');
    const [descricaoServico, setDescricaoServico] = useState<string>('');
    const [precoServico, setPrecoServico] = useState<string>('');
    const [duracaoEstimada, setDuracaoEstimada] = useState<string>('');
    const [imagem, setImagem] = useState<string | null>(null);

    const serviceId = "id";

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
        const buscarServico = async () => {
            try {
                const resposta = await fetch(`http://URL:8080/service/${serviceId}/buscar`);
                if (!resposta.ok) {
                    throw new Error('Erro ao buscar servico');
                }

                const servico = await resposta.json();
                setNomeServico(servico.name || '');
                setPrecoServico(String(servico.price) || '');
                setDescricaoServico(servico.description || '');
                setDuracaoEstimada(servico.estimated_duration || '');
                setImagem(servico.pathImage);
            } catch (erro) {
                console.error('Erro ao buscar servico:', erro);
                Alert.alert('Erro', 'Não foi possível carregar os dados do serviço.');
            }
        };

        buscarServico();
    }, []);

    const atualizarServico = async () => {
        if (!nomeServico || !imagem) {
            Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
            return;
        }

        const servico = {
            name: nomeServico,
            price: precoServico,
            estimated_duration: duracaoEstimada,
            description: descricaoServico
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

        try {
            const response = await fetch(`http://URL:8080/service/${serviceId}/atualizar`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                Alert.alert("Sucesso", "Serviço atualizado com sucesso!");
            } else {
                const error = await response.json();
                Alert.alert("Erro", error.message || "Erro ao atualizar o serviço.");
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    };

    const deletarServico = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja deletar este serviço?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Deletar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await fetch(`http://URL:8080/service/${serviceId}/deletar`, {
                                method: 'DELETE',
                            });

                            if (response.ok) {
                                Alert.alert('Sucesso', 'Serviço deletado com sucesso!');
                            } else {
                                const erro = await response.json();
                                Alert.alert('Erro', erro.message || 'Erro ao deletar o serviço.');
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
                    <Button icon={require('../../assets/icons/delete.png')} text="DELETAR" color="#B40000" action={deletarServico} />
                    <Button icon={require('../../assets/icons/edit.png')} text="ATUALIZAR" color="#006516" action={atualizarServico} />
                </View>
            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
};