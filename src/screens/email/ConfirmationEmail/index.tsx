import React, { useEffect, useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { Input } from '../../../components/Inputs/Input';

import { AdministratorId, validateTokenAdm } from '../../../api/auth/validateTokenAdm/validateTokenAdm';
import { updateConfirmationEmail } from '../../../api/administrator/update/updateConfirmation';

import { NavigationProps } from '../../../routes/AppRoute';

import { styles } from './style';
import { ButtonLarge } from '../../../components/ButtonLarge';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../../components/ErrorModal';

export default function ConfirmationEmail() {
    const { navigate } = useNavigation<NavigationProps>();
    const route = useRoute();
    const { email: emailUser } = route.params as { email: string };

    const [code, setCode] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);
    const [administratorId, setAdministratorId] = useState<string>('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    hardwareBackPress(navigate, "SendRequestConfirmationEmail");

    useEffect(() => {
        async function loadAdministratorId() {
            try {
                const administradorId: AdministratorId | undefined = await validateTokenAdm();
                if (administradorId === undefined) {
                    navigate("Login");
                    setError("Atenção!");
                    setFields(["Você foi deslogado!"])
                    setErrorModalVisible(true);
                } else {
                    setAdministratorId(administradorId.id);
                }
            } catch (error) {
                setError(`Erro ao carregar o administrador: ${error}`);
                setErrorModalVisible(true);
            }
        }
        loadAdministratorId();
    }, []);

    const sendRequestEmail = async () => {
        try {
            const success = await updateConfirmationEmail(administratorId, code);
            if (typeof success === "boolean") {
                if (success) {
                    setCode('');
                    setError('');
                    setFields([]);
                    Alert.alert('Sucesso!', 'O email foi confirmado!.');
                    navigate('ShowProfile');
                }
            } else {
                setError(success.message || "Erro desconhecido.");

                setFields(success.errorFields?.map(field => field.description) || []);
                setErrorModalVisible(true);
            }
        } catch (error) {
            setError('Não foi possível atualizar. Verifique sua conexão.');
			setErrorModalVisible(true);

        }
    };

    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <Title text="Confirmar e-mail" />

                <View style={styles.formContainer}>

                    <Input
                        label="Insira o código"
                        placeholder="Ex: 123456"
                        keyboardType="numeric"
                        value={code}
                        onChangeText={setCode}
                    />

                </View>

                <View style={styles.buttonsContainer}>
                    <ButtonLarge
                        icon={require('../../../assets/icons/add.png')}
                        text="CONFIRMAR E-MAIL"
                        color="#006316"
                        action={sendRequestEmail}
                    />
                </View>
                <TouchableOpacity onPress={() => navigate("SendRequestConfirmationEmail", { email: emailUser})}>
                    <Text style={styles.confirmText}>Não recebi o código</Text>
                </TouchableOpacity>
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