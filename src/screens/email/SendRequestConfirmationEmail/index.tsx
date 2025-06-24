import React, { useEffect, useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text, KeyboardAvoidingView, Platform } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { Input } from '../../../components/Inputs/Input';

import { AdministratorId, validateTokenAdm } from '../../../api/auth/validateTokenAdm/validateTokenAdm';
import { GLOBAL_VAR } from '../../../api/config/globalVar';
import { sendRequestConfirmationEmail } from '../../../api/administrator/update/sendRequestConfirmationEmail';

import { NavigationProps } from '../../../routes/AppRoute';

import { styles } from './style';
import { ButtonLarge } from '../../../components/ButtonLarge';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../../components/ErrorModal';

export default function SendRequestConfirmationEmail() {
    const { navigate } = useNavigation<NavigationProps>();
    const route = useRoute();
    const { email: emailUser } = route.params as { email: string };

    const [newEmail, setNewEmail] = useState<string>('');

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
                    navigate("Login");
                    setError("Atenção!");
                    setFields(["Você foi deslogado!"])
                    setErrorModalVisible(true);
                } else {
                    setAdministratorId(administradorId.id);
                    setNewEmail(emailUser);
                    GLOBAL_VAR.USER_EMAIL = emailUser;
                }
            } catch (error) {
                setError(`Erro ao carregar o administrador: ${error}`);
                setErrorModalVisible(true);
            }
        }
        loadAdministratorId();
    }, []);

    const sendRequestCreate = async () => {
        try {
            const success = await sendRequestConfirmationEmail(administratorId, newEmail);
            if (typeof success === "boolean") {
                if (success) {
                    setNewEmail(emailUser);
                    setError('');
                    setFields([]);
                    navigate("ConfirmationEmail", {email: emailUser});
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
                <Title text="Confirme seu e-mail" />

                <View style={styles.formContainer}>

                    <Input
                        label="Enviar código neste e-mail"
                        placeholder="Digite o novo e-mail"
                        keyboardType="default"
                        value={newEmail}
                        onChangeText={setNewEmail}
                    />

                </View>

                <View style={styles.buttonsContainer}>
                    <ButtonLarge
                        icon={require('../../../assets/icons/add.png')}
                        text="ENVIAR SOLICITAÇÂO"
                        color="#006316"
                        action={sendRequestCreate}
                    />
                </View>
                <ErrorModal
                    visible={errorModalVisible}
                    error={error}
                    fields={fields}
                    onClose={() =>setErrorModalVisible(false)}
                />
            </ScrollView>
        </SafeAreaView>
    </KeyboardAvoidingView>
    );
}