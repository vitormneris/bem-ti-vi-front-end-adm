import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { Input } from '../../../components/Inputs/Input';
import { InputImage } from '../../../components/Inputs/InputImage';
import { InputPassword } from '../../../components/Inputs/InputPassword';

import { NavigationProps } from "../../../routes/AppRoute";

import { deleteById } from '../../../api/administrator/delete/deleteById';
import { update } from '../../../api/administrator/update/update';

import { styles } from './style';
import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';
import { selectImageFromGalery } from '../../../utils/selectImageFromGalery/selectImageFromGalery';

export default function ManageProfile() {
    const navigation = useNavigation<NavigationProp<NavigationProps>>();
    const route = useRoute();
    const { id: adminId } = route.params as { id: string };

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