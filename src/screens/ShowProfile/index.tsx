import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, ImageSourcePropType, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '../../components/NavigationBar';
import { findById } from '../../api/administrator/search/findById';
import { AdministratorId, validateTokenAdm } from '../../api/auth/validateTokenAdm/validateTokenAdm';
import { Administrator } from '../../api/administrator/create/create';
import { NavigationProps } from '../../routes/AppRoute';
import { GLOBAL_VAR } from '../../api/config/globalVar';

import { styles } from './style';

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

    const [administratorId, setAdministratorId] = useState<string>('');
    useEffect(() => {
        const loadAdministratorData = async () => {
            try {
                const administratorIdResult: AdministratorId | undefined = await validateTokenAdm();

                if (!administratorIdResult) {
                    Alert.alert("Atenção!", "Você foi deslogado!");
                    navigate("Login");
                    return;
                }

                const id = administratorIdResult.id;
                setAdministratorId(id);

                const administrator: Administrator | undefined = await findById(id);

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

            } catch (error) {
                setError('Não foi possível atualizar. Verifique sua conexão.');
            }
        };

        loadAdministratorData();
    }, [navigate]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
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
                </View>

                <View style={styles.profileCard}>
                    <View style={styles.menuContainer}>
                        <ItemProfile
                            label="Ver Meus Dados"
                            image={require('../../assets/images/ver.png')}
                            onPress={() => navigate("Home")}
                        />
                        <ItemProfile
                            label="Editar Perfil"
                            image={require('../../assets/images/editar.png')}
                            onPress={() => navigate("ManageProfile")}
                        />
                        <ItemProfile
                            label="Alterar senha"
                            image={require('../../assets/images/password.png')}
                            onPress={() => navigate("UpdatePassword")}
                        />
                        <ItemProfile
                            label="Alterar e-mail"
                            image={require('../../assets/images/password.png')}
                            onPress={() => navigate("SendRequestEmail")}
                        />
                        <ItemProfile
                            label="Gerenciar Adm's"
                            image={require('../../assets/images/ver.png')}
                            onPress={() => navigate("SearchAdministrator")}
                        />

                        {!emailIsActive && (
                            <>
                                <Text style={styles.warningText}>Você ainda não confirmou o e-mail!</Text>
                                <ItemProfile
                                    label="Confirmar e-mail"
                                    image={require('../../assets/images/ver.png')}
                                    onPress={() => navigate("SendRequestConfirmationEmail", { email: email })}
                                />
                            </>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => logoutRequest(navigate)}
                    >
                        <Image
                            source={require('../../assets/images/logout.png')}
                            style={styles.logoutIcon}
                        />
                        <Text style={styles.logoutText}>Deslogar Perfil</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <NavigationBar initialTab='perfil' />
        </SafeAreaView>
    );
};

type ItemProfileProps = {
    image: ImageSourcePropType;
    label: string;
    onPress: () => void;
};

const ItemProfile = ({ label, image, onPress }: ItemProfileProps) => {
    return (
        <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Image source={image} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>{label}</Text>
        </TouchableOpacity>
    );
};
