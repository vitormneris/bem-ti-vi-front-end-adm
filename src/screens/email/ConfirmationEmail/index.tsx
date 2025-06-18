import React, { useEffect, useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { Input } from '../../../components/Inputs/Input';

import { AdministratorId, validateTokenAdm } from '../../../api/auth/validateTokenAdm/validateTokenAdm';
import { updateConfirmationEmail } from '../../../api/administrator/update/updateConfirmation';

import { NavigationProps } from '../../../routes/AppRoute';

import { styles } from './style';

export default function ConfirmationEmail() {
    const { navigate } = useNavigation<NavigationProps>();

    const [code, setCode] = useState<string>('');

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
                }
            } catch (error) {
                console.error('Erro ao carregar o administrador:', error);
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
                    <Button
                        icon={require('../../../assets/icons/add.png')}
                        text="CONFIRMAR E-MAIL"
                        color="#006316"
                        action={sendRequestEmail}
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