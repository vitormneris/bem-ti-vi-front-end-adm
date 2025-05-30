import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import ImagePicker from 'expo-image-picker';

import { Title } from '../../../components/Title';
import { NavigationBar } from '../../../components/NavigationBar';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Inputs/Input';
import { InputImage } from '../../../components/Inputs/InputImage';
import { InputDescription } from '../../../components/Inputs/InputDescription';

import { create, Service } from '../../../api/service/create/create';

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
        const servico: Service = {
            id: null,
            name: nomeServico,
            price: parseFloat(precoServico),
            pathImage: imagem,
            estimatedDuration: duracaoEstimada,
            description: descricaoServico,
        };

        try {
            const success = await create(servico, imagem);
            if (success) {
                setNomeServico('')
                setPrecoServico('')
                setDuracaoEstimada('')
                setDescricaoServico('')
                setImagem(null)
                Alert.alert('Sucesso!', 'O serviço foi cadastrado.')
            }
        } catch (error) {
            console.error('POST request failed:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar o serviço.');
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
                    <Button icon={require('../../../assets/icons/add.png')} text="CADASTRAR SERVIÇO" color="#006316" action={handlePost} />
                </View>
            </ScrollView>

            <NavigationBar initialTab='servicos' />
        </SafeAreaView>
    );
};
