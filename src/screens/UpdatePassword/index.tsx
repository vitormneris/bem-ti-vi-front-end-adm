import React, { useEffect, useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Title } from '../../components/Title';

import { updatePassword } from '../../api/administrator/update/updatePassword';
import { validateTokenAdm } from '../../api/auth/validateTokenAdm/validateTokenAdm';
import { NavigationProps } from '../../routes/AppRoute';
import { Passwords, AdministratorId } from '../../utils/Types';

import { styles } from './style';
import { InputPassword } from '../../components/Inputs/InputPassword';
import { ButtonLarge } from '../../components/ButtonLarge';
import hardwareBackPress from '../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../components/ErrorModal';

export default function UpdatePassword() {
    const { navigate } = useNavigation<NavigationProps>();

    const [passwordOld, setPasswordOld] = useState<string>('');
    const [passwordNew, setPasswordNew] = useState<string>('');
    const [showPasswordOld, setShowPasswordOld] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);
    const [administratorId, setAdministratorId] = useState<string>('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    hardwareBackPress(navigate, "ShowProfile");

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

    const toggleShowPasswordOld = () => setShowPasswordOld(!showPasswordOld);
    const toggleShowPasswordNew = () => setShowPasswordNew(!showPasswordNew);

    const sendRequestCreate = async () => {
        if (!administratorId) {
            Alert.alert('Erro', 'Administrador não carregado ainda.');
            return;
        }

        const passwords: Passwords = {
            passwordOld,
            passwordNew,
        };

        try {
            setLoading(true);
            const result = await updatePassword(administratorId, passwords);

            if (typeof result === "boolean") {
                if (result) {
                    setPasswordOld('');
                    setPasswordNew('');
                    setError('');
                    setFields([]);
                    Alert.alert('Sucesso!', 'A senha foi atualizada.');
                    navigate('ShowProfile');
                }
            } else {
                setError(result.message || "Erro desconhecido.");
                setFields(
                    Array.isArray(result.errorFields) 
                    ? result.errorFields.map(field => field.description) 
                    : []
                );
                setErrorModalVisible(true);
            }
        } catch (error) {
            setError('Não foi possível atualizar. Verifique sua conexão.');
        }finally {
			setLoading(false);
		}
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <Title text="Atualizar senha" />

                <View style={styles.formContainer}>
                    <InputPassword
                        label="Senha atual"
                        placeholder="Digite sua senha atual"
                        toggleShowPassword={toggleShowPasswordOld}
                        showPassword={showPasswordOld}
                        password={passwordOld}
                        setPassword={setPasswordOld}
                    />

                    <InputPassword
                        label="Nova senha"
                        placeholder="Digite sua nova senha"
                        toggleShowPassword={toggleShowPasswordNew}
                        showPassword={showPasswordNew}
                        password={passwordNew}
                        setPassword={setPasswordNew}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#256489" style={{ marginTop: 20 }} />
                    ):
                    <ButtonLarge
                        icon={require('../../assets/icons/edit.png')}
                        text="ATUALIZAR SENHA"
                        color="#256489"
                        width='65%'
                        action={sendRequestCreate}
                        disabled={!administratorId}
                    />
                    }
                </View>

                <ErrorModal
                    visible={errorModalVisible}
                    error={error}
                    fields={fields}
                    onClose={() => setErrorModalVisible(false)}
                />
            </ScrollView>

        </SafeAreaView>
    );
}


