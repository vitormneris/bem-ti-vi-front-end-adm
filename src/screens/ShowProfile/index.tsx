import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert, Image, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationBar } from '../../components/NavigationBar';
import { findById } from '../../api/administrator/search/findById';
import { validateTokenAdm } from '../../api/auth/validateTokenAdm/validateTokenAdm';
import { Administrator,AdministratorId } from '../../utils/Types';
import { NavigationProps } from '../../routes/AppRoute';
import { GLOBAL_VAR } from '../../api/config/globalVar';

import { styles } from './style';
import hardwareBackPress from '../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../components/ErrorModal';

const logoutRequest = (navigate: any) => {
    Alert.alert(
        'Confirmação',
        'Tem certeza que deseja sair?',
        [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Sair',
                style: 'destructive',
                onPress: () => {
                    GLOBAL_VAR.TOKEN_JWT = "";
                    navigate("Login");
                },
            },
        ]
    );
};

export const ShowProfile = () => {
    const { navigate } = useNavigation<NavigationProps>();

    const [name, setName] = useState<string>('');
    const [photoProfile, setPhotoProfile] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [emailIsActive, setEmailIsActive] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [administratorObj, setAdministratorObj] = useState<Administrator>();
    
    hardwareBackPress(navigate, "Home");

    useEffect(() => {
        const loadAdministratorData = async () => {
            try {
                const administratorIdResult: AdministratorId | undefined = await validateTokenAdm();

                if (!administratorIdResult) {
                    Alert.alert("Atenção!", "Você foi deslogado!");
                    navigate("Login");
                    return;
                }

                const administrator: Administrator | undefined = await findById(administratorIdResult.id);

                if (!administrator) {
                    throw new Error('Administrador não encontrado');
                }

                if (administrator.activationStatus != null && !administrator.activationStatus.isActive) {
                    navigate("AdministratorDeactivated");
                }

                setName(administrator.name);
                setPhotoProfile(administrator.pathImage);
                setEmail(administrator.email);
                setEmailIsActive(administrator.isEmailActive);
                setAdministratorObj(administrator)

            } catch {
                setError('Não foi possível atualizar. Verifique sua conexão.');
                setErrorModalVisible(true);
            }
        };

        loadAdministratorData();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.profileSection}>
                    {photoProfile ? (
                        <Image
                            source={{ uri: photoProfile }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={styles.profileImagePlaceholder}>
                            <Text>Sem Foto</Text>
                        </View>
                    )}
                    <Text style={styles.profileLabel}>{name}</Text>
                    {emailIsActive && (
                        <Text style={styles.confirmText}>Seu e-mail está confirmado!</Text>
                    )}
                    {!emailIsActive && (
                        <Text style={styles.warningText}>Você ainda não confirmou o e-mail!</Text>
                    )}
                </View>

                <View style={styles.profileCard}>
                    <View style={styles.menuContainer}>
                        <ItemProfile
                            label="Ver Meus Dados"
                            icon="account-outline"
                            onPress={() => {
                                if (administratorObj) {
                                    navigate("ViewAdministrator", { administrator: administratorObj });
                                } else {
                                    Alert.alert("Erro", "Dados do administrador ainda não foram carregados.");
                                }
                            }}
                        />
                        <ItemProfile
                            label="Editar Perfil"
                            icon="account-edit-outline"
                            onPress={() => navigate("ManageProfile")}
                        />
                        <ItemProfile
                            label="Alterar senha"
                            icon="lock-reset"
                            onPress={() => navigate("UpdatePassword")}
                        />
                        <ItemProfile
                            label="Alterar e-mail"
                            icon="email-edit-outline"
                            onPress={() => navigate("SendRequestChangeEmail", { email })}
                        />
                        <ItemProfile
                            label="Gerenciar Adm's"
                            icon="account-group-outline"
                            onPress={() => navigate("SearchAdministrator")}
                        />

                        <ItemProfile
                            label="Excluir conta"
                            icon="account-remove-outline"
                            onPress={() => navigate("DeleteProfile")}
                        />

                        <ItemProfile
                            label="Chat"
                            icon="account-remove-outline"
                            onPress={() => navigate("ChatADM", { name: name })}
                        />

                        {!emailIsActive && (
                            <ItemProfile
                                label="Confirmar e-mail"
                                icon="email-check-outline"
                                onPress={() => navigate("SendRequestConfirmationEmail", { email })}
                            />
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => logoutRequest(navigate)}
                    >
                        <Icon name="logout" size={24} color="#fff" style={styles.logoutIcon} />
                        <Text style={styles.logoutText}>Deslogar Perfil</Text>
                    </TouchableOpacity>
                </View>

            <ErrorModal
                visible={errorModalVisible}
                error={error}
                onClose={() => setErrorModalVisible(false)}
            />	
            </ScrollView>

            <NavigationBar initialTab='perfil' />
        </SafeAreaView>
    );
};

type ItemProfileProps = {
    icon: string;
    label: string;
    onPress: () => void;
};

const ItemProfile = ({ label, icon, onPress }: ItemProfileProps) => {
    return (
        <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Icon name={icon} size={24} color="#256489" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>{label}</Text>
        </TouchableOpacity>
    );
};
