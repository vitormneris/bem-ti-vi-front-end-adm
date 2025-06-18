import React, { useEffect, useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text } from 'react-native';

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

export default function SendRequestConfirmationEmail() {
    const { navigate } = useNavigation<NavigationProps>();
    const route = useRoute();
    const { email: emailUser } = route.params as { email: string };

    const [newEmail, setNewEmail] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);
    const [administratorId, setAdministratorId] = useState<string>('');

    useEffect(() => {
        async function loadAdministratorId() {
            try {
                const administradorId: AdministratorId | undefined = await validateTokenAdm();
                if (administradorId === undefined) {
                    navigate("Login");
                    Alert.alert("Atenção!", "Você foi deslogado!");
                } else {
                    setAdministratorId(administradorId.id);
                    setNewEmail(emailUser);
                    GLOBAL_VAR.USER_EMAIL = emailUser;
                }
            } catch (error) {
                console.error('Erro ao carregar o administrador:', error);
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
                    navigate("ConfirmationEmail");
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
                    <Button
                        icon={require('../../../assets/icons/add.png')}
                        text="ENVIAR SOLICITAÇÂO"
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