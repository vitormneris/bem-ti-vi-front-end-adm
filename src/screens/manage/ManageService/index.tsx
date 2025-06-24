import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { InputDescription } from '../../../components/Inputs/InputDescription';
import { InputImage } from '../../../components/Inputs/InputImage';
import { Input } from '../../../components/Inputs/Input';

import { NavigationProps } from '../../../routes/AppRoute';

import { findById } from '../../../api/service/search/findById';
import { deleteById } from '../../../api/service/delete/deleteById';
import { update } from '../../../api/service/update/update';
import { Service } from '../../../api/service/create/create';

import { styles } from './style';
import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';
import { selectImageFromGalery } from '../../../utils/selectImageFromGalery/selectImageFromGalery';
import { InputTime } from '../../../components/Inputs/InputTime';
import { Text } from 'react-native';
import { InputSmall } from '../../../components/Inputs/InputSmall';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../../components/ErrorModal';

export default function ManageService() {
    const route = useRoute();
    const { id: serviceId } = route.params as { id: string };
    const { navigate } = useNavigation<NavigationProps>();

    const [nomeServico, setNomeServico] = useState<string>('');
    const [descricaoServico, setDescricaoServico] = useState<string>('');
    const [precoServico, setPrecoServico] = useState<string>('');
    const [duracaoEstimada, setDuracaoEstimada] = useState<string>('');
    const [imagem, setImagem] = useState<string>('');

    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    useValidateToken();
    hardwareBackPress(navigate, "SearchService");

    const selecionarImagem = async () => {
        const imageSelected = await selectImageFromGalery();
        if (imageSelected) {
            setImagem(imageSelected);
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
                setError(`Erro ao buscar servico: ${erro}`);
                setFields(['Não foi possível carregar os dados do serviço.']);
                setErrorModalVisible(true);
            }
        };

        buscarServico();
    }, [serviceId]);

    const handleUpdate = async () => {
        if (!nomeServico || !precoServico || !duracaoEstimada || !descricaoServico) {
            setError(`Campos obrigatórios`);
            setFields(['Preencha todos os campos antes de atualizar.']);
            setErrorModalVisible(true);
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
            const result = await update(serviceId, servico, imagem);

            if (typeof result === "boolean") {
                if (result) {
                    Alert.alert("Sucesso!", "O serviço foi atualizado.");
                    navigate('SearchService');
                }
            } else {
                setError(result.message || "Erro desconhecido.");
                setFields(result.errorFields?.map(field => field.description) || []);
                setErrorModalVisible(true);
            }

        } catch (error) {
            setError('Não foi possível atualizar o produto. Verifique sua conexão.');
            setErrorModalVisible(true);
        }
    };

    const handleTimeChange = (event: any, selectedDate?: Date) => {
        setShowTimePicker(false);
        if (event.type === "dismissed") return;

        if (selectedDate) {
            const hours = selectedDate.getHours().toString().padStart(2, '0');
            const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
            const seconds = selectedDate.getSeconds().toString().padStart(2, '0');
            setDuracaoEstimada(`${hours}:${minutes}:${seconds}`);
        }
    };

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
            Alert.alert('Erro', 'Não foi possível excluir o serviço.');
        }
    };

    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <Title text="Atualize este serviço" />

                <Input
                    label="Nome"
                    placeholder="Digite o nome"
                    keyboardType="default"
                    value={nomeServico}
                    onChangeText={setNomeServico}
                />

                <View style={styles.subcontainer}>
                    <InputTime
                        label="Duração estimada"
                        durationEstimated={duracaoEstimada}
                        setShowTimePicker={setShowTimePicker}
                        showTimePicker={showTimePicker}
                        handleTimeChange={handleTimeChange}
                    />

                    <InputSmall
                        label="Valor"
                        placeholder="Digite o valor"
                        keyboardType="numeric"
                        value={precoServico}
                        onChangeText={setPrecoServico}
                    />
                </View>

                <InputImage
                    label="Imagem"
                    image={imagem}
                    selectImage={selecionarImagem}
                />

                <InputDescription
                    label="Descrição"
                    placeholder="Descreva o serviço em detalhes"
                    keyboardType="default"
                    value={descricaoServico}
                    onChangeText={setDescricaoServico}
                />

                <View style={styles.buttonsContainer}>
                    <Button
                        icon={require('../../../assets/icons/delete.png')}
                        text="DELETAR"
                        color="#B40000"
                        action={handleDelete}
                    />
                    <Button
                        icon={require('../../../assets/icons/edit.png')}
                        text="ATUALIZAR"
                        color="#006516"
                        action={handleUpdate}
                    />
                </View>
                <ErrorModal
                    visible={errorModalVisible}
                    error={error}
                    fields={fields}
                    onClose={() => setErrorModalVisible(false)}
                />
            </ScrollView>

        </SafeAreaView>
    </KeyboardAvoidingView>
    );
};