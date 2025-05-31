import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

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
            if (success) {
                setNome('');
                setEmail('');
                setSenha('');
                setFotoPerfil('');
                Alert.alert('Sucesso!', 'O administrador foi cadastrada.');
            }
        } catch (error) {
            console.error('POST request failed:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar o administrador.');
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
            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
}