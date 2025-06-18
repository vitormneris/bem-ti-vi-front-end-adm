import React, { useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, Image, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { Input } from '../../../components/Inputs/Input';
import { InputImage } from '../../../components/Inputs/InputImage';

import { NavigationProps } from "../../../routes/AppRoute";

import { update } from '../../../api/administrator/update/update';
import { Administrator } from '../../../api/administrator/create/create';
import { findById } from '../../../api/administrator/search/findById';
import { AdministratorId, validateTokenAdm } from '../../../api/auth/validateTokenAdm/validateTokenAdm';

import { selectImageFromGalery } from '../../../utils/selectImageFromGalery/selectImageFromGalery';

import { styles } from './style';

export default function ManageProfile() {
    const { navigate } = useNavigation<NavigationProps>();

    const [nome, setNome] = useState<string>('');
    const [fotoPerfil, setFotoPerfil] = useState<string>('');
    const [administratorId, setAdministratorId] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);

    const selecionarImagem = async () => {
        try {
            const imageSelected = await selectImageFromGalery();
            if (imageSelected) {
                setFotoPerfil(imageSelected);
            }
        } catch (error) {
            console.error('Erro ao selecionar imagem:', error);
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
            const success = await update(objAdm, fotoPerfil, administratorId);

            if (typeof success === "boolean") {
                if (success) {
                    Alert.alert("Sucesso!", "Sua conta foi atualizada.");
                    navigate('ShowProfile');
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
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <Title text="Gerenciar Perfil" />

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
                        label="Nome do Administrador"
                        placeholder="Insira o nome completo"
                        keyboardType="default"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <InputImage
                        label="Imagem do Perfil"
                        image={fotoPerfil}
                        selectImage={selecionarImagem}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <Button
                        icon={require('../../../assets/icons/edit.png')}
                        text="ATUALIZAR"
                        color="#006516"
                        action={updateSend}
                    />
                </View>
                {error ? (
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ color: 'red' }}>{error}</Text>
                        {fields.map((field, index) => (
                            <Text key={index} style={{ color: 'red' }}>• {field}</Text>
                        ))}
                    </View>
                ) : null}
            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
}
