import React, { useEffect, useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text, Touchable, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { Input } from '../../../components/Inputs/Input';

import { validateTokenAdm } from '../../../api/auth/validateTokenAdm/validateTokenAdm';
import { updateEmail } from '../../../api/administrator/update/updateEmail';
import { AdministratorId } from '../../../utils/Types';

import { NavigationProps } from '../../../routes/AppRoute';

import { styles } from './style';
import { ButtonLarge } from '../../../components/ButtonLarge';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../../components/ErrorModal';

export default function UpdateEmail() {
    const { navigate } = useNavigation<NavigationProps>();
    const route = useRoute();
    const { email: emailUser } = route.params as { email: string };

    const [code, setCode] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);
    const [administratorId, setAdministratorId] = useState<string>('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    hardwareBackPress(navigate, "SendRequestChangeEmail");
    
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
        setLoading(true);
        try {
            const success = await updateEmail(administratorId, code);
            if (typeof success === "boolean") {
                if (success) {
                    setCode('');
                    setError('');
                    setFields([]);
                    Alert.alert('Sucesso!', 'O email foi atualizado.');
                    navigate('Login');
                }
            } else {
                setError(success.message || "Erro desconhecido.");

                setFields(
                    Array.isArray(success.errorFields) 
                    ? success.errorFields.map(field => field.description) 
                    : []
                );
                setErrorModalVisible(true);
            }
        } catch (error) {
            setError('Não foi possível atualizar. Verifique sua conexão.');
            setErrorModalVisible(true);
        }finally {
			setLoading(false);
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
                <Title text="Trocar e-mail" />

                <View style={styles.formContainer}>

                    <Input
                        label="Insira o código de cofirmação"
                        placeholder="Ex: 123456"
                        keyboardType="numeric"
                        value={code}
                        onChangeText={setCode}
                    />

                </View>

                {loading ? (
					<ActivityIndicator size="large" color="#256489" style={{ marginTop: 20 }} />
				):
                <View style={styles.buttonsContainer}>
                    <ButtonLarge
                        icon={require('../../../assets/icons/edit.png')}
                        text="ATUALIZAR E-MAIL"
                        color="#006316"
                        action={sendRequestEmail}
                    />
                </View>
                }
                
                <TouchableOpacity onPress={() => navigate("SendRequestChangeEmail", { email: emailUser })}>
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