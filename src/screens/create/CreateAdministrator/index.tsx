import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import ImagePicker from 'expo-image-picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { Input } from '../../../components/Inputs/Input';
import { InputImage } from '../../../components/Inputs/InputImage';
import { InputPassword } from '../../../components/Inputs/InputPassword';

import { RootStackParamList } from '../../../routes';

import { Administrator, create } from '../../../api/administrator/create/create';

import { styles } from './style';

export default function CreateAdministrator() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);

    const selecionarImagem = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setFotoPerfil(result.assets[0].uri);
        }
    };

    const sendRequestCreate = async () => {
        const administrator: Administrator = {
            id: null,
            name: nome,
            email: email,
            password: senha,
            pathImage: "",
        };

        try {
            const success = await create(administrator, fotoPerfil);
            if (success) {
                setNome('')
                setEmail('')
                setSenha('')
                setFotoPerfil(null)
                Alert.alert('Sucesso!', 'O administrador foi cadastrada.')
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