import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import ImagePicker from 'expo-image-picker';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { InputDescription } from '../../../components/Inputs/InputDescription';
import { InputImage } from '../../../components/Inputs/InputImage';
import { Input } from '../../../components/Inputs/Input';

import { NavigationProps } from '../../../routes/index';

import { findById } from '../../../api/service/search/findById';
import { deleteById } from '../../../api/service/delete/deleteById';
import { update } from '../../../api/service/update/update';
import { Service } from '../../../api/service/create/create';

import { styles } from './style';

export default function ManageService() {
    const route = useRoute();
    const { id: serviceId } = route.params as { id: string };
    const { navigate } = useNavigation<NavigationProps>();

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
        const buscarServico = async () => {
            try {
                const data: Service | undefined = await findById(serviceId);
                if (!data) {
                    throw new Error('Erro ao buscar servico');
                }

                setNomeServico(data.name);
                setPrecoServico(String(data.price));
                setDescricaoServico(data.description);
                setDuracaoEstimada(data.estimatedDuration);
                setImagem(data.pathImage);
            } catch (erro) {
                console.error('Erro ao buscar servico:', erro);
                Alert.alert('Erro', 'Não foi possível carregar os dados do serviço.');
            }
        };

        buscarServico();
    }, [serviceId]);

    const handleUpdate = async () => {
        if (!nomeServico || !precoServico || !duracaoEstimada || !descricaoServico) {
            Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
            return;
        }

        const servico: Service = {
            id: null,
            name: nomeServico,
            price: parseFloat(precoServico),
            pathImage: imagem,
            estimatedDuration: duracaoEstimada,
            description: descricaoServico
        };

        try {
            const success = await update(servico, imagem, serviceId);

            if (success) {
                Alert.alert('Sucesso!', 'O serviço foi atualizado.');
                navigate('SearchService')
            }

        } catch (error) {
            console.error('UPDATE request failed:', error);
            Alert.alert('Erro', 'Falha ao atualizar o serviço.');
        }
    }

    const handleDelete = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este serviço?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => confirmDelete(serviceId),
                },
            ]
        );
    }

    const confirmDelete = async (serviceId: string) => {
        try {
            const success = await deleteById(serviceId);

            if (success) {
                Alert.alert('Sucesso!', 'O serviço foi excluído.');
                navigate('SearchService')
            }

        } catch (error) {
            console.error('Erro ao excluir:', error);
            Alert.alert('Erro', 'Não foi possível excluir o serviço.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

                <Title text="Informações do Serviço" />

                <Input
                    label="Nome do Serviço"
                    placeholder="Digite o nome do serviço"
                    keyboardType="default"
                    value={nomeServico}
                    onChangeText={setNomeServico}
                />

                <Input
                    label="Preço do Serviço"
                    placeholder="Digite o valor do serviço"
                    keyboardType="numeric"
                    value={precoServico}
                    onChangeText={setPrecoServico}
                />

                <Input
                    label="Duração Estimada"
                    placeholder="Ex: 03:30:00"
                    keyboardType="default"
                    value={duracaoEstimada}
                    onChangeText={setDuracaoEstimada}
                />

                <InputImage
                    label="Imagem do Serviço"
                    image={imagem}
                    selectImage={selecionarImagem}
                />

                <InputDescription
                    label="Descrição do Serviço"
                    placeholder="Descreva o serviço em detalhes"
                    keyboardType="default"
                    value={descricaoServico}
                    onChangeText={setDescricaoServico}
                />

                <View style={styles.buttonsContainer}>
                    <Button icon={require('../../../assets/icons/delete.png')} text="DELETAR" color="#B40000" action={handleDelete} />
                    <Button icon={require('../../../assets/icons/edit.png')} text="ATUALIZAR" color="#006516" action={handleUpdate} />
                </View>
            </ScrollView>

            <NavigationBar initialTab='servicos' />
        </SafeAreaView>
    );
};