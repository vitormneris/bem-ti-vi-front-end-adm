import React, { useEffect, useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Title } from '../../components/Title';

import { Passwords, updatePassword } from '../../api/administrator/update/updatePassword';
import { AdministratorId, validateTokenAdm } from '../../api/auth/validateTokenAdm/validateTokenAdm';
import { NavigationProps } from '../../routes/AppRoute';

import { styles } from './style';
import { InputPassword } from '../../components/Inputs/InputPassword';
import { ButtonLarge } from '../../components/ButtonLarge';
import hardwareBackPress from '../../utils/hardwareBackPress/hardwareBackPress';

export default function UpdatePassword() {
    const { navigate } = useNavigation<NavigationProps>();

    const [passwordOld, setPasswordOld] = useState<string>('');
    const [passwordNew, setPasswordNew] = useState<string>('');
    const [showPasswordOld, setShowPasswordOld] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);
    const [administratorId, setAdministratorId] = useState<string>('');

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
                setFields(result.errorFields?.map(field => field.description) || []);
            }
        } catch (error) {
            setError('Não foi possível atualizar. Verifique sua conexão.');
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
                    <ButtonLarge
                        icon={require('../../assets/icons/edit.png')}
                        text="ATUALIZAR SENHA"
                        color="#256489"
                        width='65%'
                        action={sendRequestCreate}
                        disabled={!administratorId}
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

        </SafeAreaView>
    );
}


