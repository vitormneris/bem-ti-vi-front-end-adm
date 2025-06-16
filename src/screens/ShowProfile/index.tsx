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
}

export const ShowProfile = () => {
    const { navigate } = useNavigation<NavigationProps>();

    const [name, setName] = useState<string>('');
    const [photoProfile, setPhotoProgile] = useState<string>('');

    let administratorId: string = "";
    useEffect(() => {
        async function loadAdministratorId() {
            try {
                const administradorId: AdministratorId | undefined = await validateTokenAdm();
                if (administradorId == undefined) {
                    navigate("Login");
                    Alert.alert("Atenção!", "Você foi deslogado!")
                } else {
                    administratorId = administradorId.id;
                }

                if (administratorId == '') {
                    return;
                }

                const administrator: Administrator | undefined = await findById(administratorId);

                if (administrator == undefined) {
                    throw new Error('Erro ao buscar administrador');
                } else {
                    setName(administrator.name);
                    setPhotoProgile(administrator.pathImage);
                }
            } catch (error) {
                console.error('Erro ao carregar o administrador:', error);
            }
        }
        loadAdministratorId();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: photoProfile }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileLabel}>{name}</Text>
                </View>

                <View style={styles.profileCard}>
                    <View style={styles.menuContainer}>

                        <ItemProfile
                            screen={"Home"}
                            navigate={navigate}
                            label="Ver Meus Dados"
                            image={require('../../assets/images/ver.png')}
                        />

                        <ItemProfile
                            screen={"ManageProfile"}
                            navigate={navigate}
                            label="Editar Perfil"
                            image={require('../../assets/images/editar.png')}
                        />

                        <ItemProfile
                            screen={"Home"}
                            navigate={navigate}
                            label="Alterar senha"
                            image={require('../../assets/images/password.png')}
                        />

                        <ItemProfile
                            screen={"CreateAdministrator"}
                            navigate={navigate}
                            label="Cadastrar Adm's"
                            image={require('../../assets/images/adm.png')}
                        />

                        <ItemProfile
                            screen={"SearchAdministrator"}
                            navigate={navigate}
                            label="Histórico de Adm's"
                            image={require('../../assets/images/ver.png')}
                        />
                    </View>

                    <TouchableOpacity style={styles.logoutButton} onPress={() => logoutRequest(navigate)}>
                        <Image source={require('../../assets/images/logout.png')} style={styles.logoutIcon} />
                        <Text style={styles.logoutText}>Deslogar Perfil</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
};

type ItemProfileProps = {
    image: ImageSourcePropType,
    label: string,
    navigate: (screen: string) => void,
    screen: string
}

function ItemProfile({ label, image, navigate, screen }: ItemProfileProps) {
    return (
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => navigate(screen)}>
            <Image source={image} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>{label}</Text>
        </TouchableOpacity>
    )
}