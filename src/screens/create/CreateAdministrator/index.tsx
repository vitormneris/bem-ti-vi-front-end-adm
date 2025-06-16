import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text } from 'react-native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { Input } from '../../../components/Inputs/Input';
import { InputImage } from '../../../components/Inputs/InputImage';
import { InputPassword } from '../../../components/Inputs/InputPassword';

import { Administrator, create } from '../../../api/administrator/create/create';

import { selectImageFromGalery } from '../../../utils/selectImageFromGalery/selectImageFromGalery';
import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';

import { styles } from './style';

export default function CreateAdministrator() {
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [fotoPerfil, setFotoPerfil] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);

    useValidateToken();

    const selecionarImagem = async () => {
        const imageSelected = await selectImageFromGalery();
        if (imageSelected) {
            setFotoPerfil(imageSelected);
        }
    };

    const sendRequestCreate = async () => {
        const administrator: Administrator = {
            id: '',
            name: nome,
            email: email,
            password: senha,
            pathImage: '',
        };

        try {
            const success = await create(administrator, fotoPerfil);
            if (typeof success === "boolean") {
                if (success) {
                    setNome('');
                    setEmail('');
                    setSenha('');
                    setFotoPerfil('');
                    setError('');
                    setFields([]);
                    Alert.alert('Sucesso!', 'O administrador foi cadastrada.');
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

                    <Input
                        label="Nome do Administrador"
                        placeholder="Insira o nome completo"
                        keyboardType="default"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Input
                        label="E-mail do Administrador"
                        placeholder="Insira o e-mail"
                        keyboardType="default"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <InputPassword
                        label="Senha do Administrador"
                        placeholder="Insira a nova senha"
                        keyboardType="default"
                        value={senha}
                        onChangeText={setSenha}
                    />

                    <InputImage
                        label="Imagem do Perfil"
                        image={fotoPerfil}
                        selectImage={selecionarImagem}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <Button
                        icon={require('../../../assets/icons/add.png')}
                        text="CADASTRAR ADMINISTRADOR"
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

            <NavigationBar />
        </SafeAreaView>
    );
}