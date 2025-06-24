import React, { useEffect, useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NavigationProps } from '../../routes/AppRoute';
import { AdministratorId, validateTokenAdm } from '../../api/auth/validateTokenAdm/validateTokenAdm';
import { deleteById } from '../../api/administrator/delete/deleteById';
import { Title } from '../../components/Title';
import { InputPassword } from '../../components/Inputs/InputPassword';
import { ButtonLarge } from '../../components/ButtonLarge';
import { styles } from './style';
import { Error as ApiError } from '../../api/product/update/update';
import hardwareBackPress from '../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../components/ErrorModal';

export default function DeleteProfile() {
    const { navigate } = useNavigation<NavigationProps>();

    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);
    const [administratorId, setAdministratorId] = useState<string>('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    hardwareBackPress(navigate, "ShowProfile");

    useEffect(() => {
        async function loadAdministratorId() {
            try {
                const administradorId: AdministratorId | undefined = await validateTokenAdm();
                if (administradorId === undefined) {
                    setError("Atenção!");
                    setFields(["Você foi deslogado!"])
                    setErrorModalVisible(true);
                    navigate("Login");
                } else {
                    setAdministratorId(administradorId.id);
                }
            } catch (error) {
                setError(`Erro ao carregar o administrador: ${error}`);
                setFields(['Não foi possível validar sua sessão. Tente novamente.'])
                setErrorModalVisible(true);
            }
        }
        loadAdministratorId();
    }, []);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const confirmDelete = async () => {
        try {
            const success: boolean | ApiError = await deleteById(administratorId, password);

            if (typeof success === "boolean") {
                if (success) {
                    Alert.alert('Sucesso!', 'A sua conta foi excluída.');
                    navigate('Login');
                }
            } else {
                setError(success.message || "Erro desconhecido.");
                setFields(success.errorFields?.map(field => field.description) || []);
                setErrorModalVisible(true);
            }
        } catch (error) {
            setError(`Erro na exclusão: ${error}`);
            setFields(['Não foi possível deletar. Verifique sua conexão.']);
            setErrorModalVisible(true);
        }
    };

    const sendRequestDelete = async () => {
        Alert.alert(
            'Atenção!',
            'Tem certeza que deseja excluir sua conta?\n\nEssa ação não poderá ser desfeita.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: confirmDelete,
                },
            ]
        );
    };

    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <Title text="Deletar conta" />

                <View style={styles.formContainer}>
                    <InputPassword
                        label="Digite sua senha para confirmar a exclusão da conta!"
                        placeholder="Digite sua senha aqui"
                        toggleShowPassword={toggleShowPassword}
                        showPassword={showPassword}
                        password={password}
                        setPassword={setPassword}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <ButtonLarge
                        icon={require('../../assets/icons/delete.png')}
                        text="DELETAR CONTA"
                        color="#eb1717"
                        width='65%'
                        action={sendRequestDelete}
                        disabled={!administratorId}
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
}
