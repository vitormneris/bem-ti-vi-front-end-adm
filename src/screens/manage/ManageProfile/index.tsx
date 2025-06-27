import React, { useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, Image, Text, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { Input } from '../../../components/Inputs/Input';
import { InputImage } from '../../../components/Inputs/InputImage';

import { NavigationProps } from "../../../routes/AppRoute";

import { update } from '../../../api/administrator/update/update';
import { findById } from '../../../api/administrator/search/findById';
import { validateTokenAdm } from '../../../api/auth/validateTokenAdm/validateTokenAdm';
import { Administrator, AdministratorId } from '../../../utils/Types';

import { selectImageFromGalery } from '../../../utils/selectImageFromGalery/selectImageFromGalery';

import { styles } from './style';
import { ButtonLarge } from '../../../components/ButtonLarge';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../../components/ErrorModal';

export default function ManageProfile() {
    const { navigate } = useNavigation<NavigationProps>();

    const [nome, setNome] = useState<string>('');
    const [fotoPerfil, setFotoPerfil] = useState<string>('');
    const [administratorId, setAdministratorId] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);


    hardwareBackPress(navigate, "ShowProfile");

    const selecionarImagem = async () => {
        try {
            const imageSelected = await selectImageFromGalery();
            if (imageSelected) {
                setFotoPerfil(imageSelected);
            }
        } catch (error) {
            setError(`Erro ao selecionar imagem: ${error}`);
            setErrorModalVisible(true);
        }
    };

    useEffect(() => {
        const loadAdministratorData = async () => {
            try {
                const administradorId: AdministratorId | undefined = await validateTokenAdm();

                if (!administradorId) {
                    Alert.alert("Atenção!", "Você foi deslogado!");
                    navigate("Login");
                    return;
                }

                setAdministratorId(administradorId.id);

                const administrator = await findById(administradorId.id);
                if (!administrator) {
                    throw new Error('Erro ao buscar administrador');
                }

                if (administrator.activationStatus != null && !administrator.activationStatus.isActive) {
                    navigate("AdministratorDeactivated");
                }

                setNome(administrator.name);
                setFotoPerfil(administrator.pathImage);

            } catch (error) {
                setError('Não foi possível atualizar. Verifique sua conexão.');
                setErrorModalVisible(true);
            }
        };

        loadAdministratorData();
    }, [navigate]);

    const updateSend = async () => {
        if (!nome.trim()) {
            Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
            return;
        }
        
        const objAdm: Administrator = {
            name: nome,
        } as Administrator;

        try {
            setLoading(true);
            const success = await update(objAdm, fotoPerfil, administratorId);

            if (typeof success === "boolean") {
                if (success) {
                    Alert.alert("Sucesso!", "Sua conta foi atualizada.");
                    navigate('ShowProfile');
                }
            } else {
                setError(success.message || "Erro desconhecido.");

                setFields(
                    Array.isArray(success.errorFields) 
                    ? success.errorFields.map(field => field.description) 
                    : []
                );
                setErrorModalVisible(true);
            }

        } catch (error) {
            setError('Não foi possível atualizar. Verifique sua conexão.');
            setErrorModalVisible(true);
        }finally {
			setLoading(false);
		}
    };

    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <SafeAreaView style={styles.safeArea}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <Title text="Atualize o seu Perfil" />

                <View style={styles.formContainer}>
                    <View style={styles.profileSection}>
                        {fotoPerfil ? (
                            <Image
                                source={{ uri: fotoPerfil }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Text style={styles.profileLabel}>Nenhuma imagem selecionada</Text>
                        )}
                    </View>

                    <Input
                        label="Nome"
                        placeholder="Insira o nome completo"
                        keyboardType="default"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <InputImage
                        label="Imagem"
                        image={fotoPerfil}
                        selectImage={selecionarImagem}
                    />
                </View>

                {loading ? (
					<ActivityIndicator size="large" color="#256489" style={{ marginTop: 20 }} />
				):
                <View style={styles.buttonsContainer}>
                    <ButtonLarge
                        icon={require('../../../assets/icons/edit.png')}
                        text="ATUALIZAR PERFIL"
                        color="#006516"
                        action={updateSend}
                    />
                </View>
                }

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
}
