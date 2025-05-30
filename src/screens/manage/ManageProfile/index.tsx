import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import ImagePicker from 'expo-image-picker';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { Input } from '../../../components/Inputs/Input';
import { InputImage } from '../../../components/Inputs/InputImage';
import { InputPassword } from '../../../components/Inputs/InputPassword';

import { RootStackParamList } from '../../../routes';

import { Administrator } from '../../../api/administrator/create/create';
import { findById } from '../../../api/administrator/search/findById';
import { deleteById } from '../../../api/administrator/delete/deleteById';
import { update } from '../../../api/administrator/update/update';

import { styles } from './style';

export default function ManageProfile() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute();
    const { id: adminId } = route.params as { id: string };

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

    useEffect(() => {
        const buscarPerfil = async () => {
            try {
                const data: Administrator | undefined = await findById(adminId);

                if (!data) {
                    throw new Error('Erro ao buscar produto');
                }    

                setNome(data.name);
                setEmail(data.email);
                setSenha(data.password)
                setFotoPerfil(data.pathImage);
            } catch (erro) {
                console.error('Erro ao buscar perfil:', erro);
                Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
            }
        };

        buscarPerfil();
    }, [adminId]);

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
                        icon={require('../../../assets/icons/delete.png')}
                        text="DELETAR"
                        color="#B40000"
                        action={deleteById}
                    />
                    <Button
                        icon={require('../../../assets/icons/edit.png')}
                        text="ATUALIZAR"
                        color="#006516"
                        action={update}
                    />
                </View>
            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
}