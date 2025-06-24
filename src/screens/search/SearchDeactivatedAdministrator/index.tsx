import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Administrator } from "../../../api/administrator/create/create";
import { findByStatus } from "../../../api/administrator/search/findByStatus";
import { activationById } from "../../../api/administrator/delete/activationById";

import { NavigationProps } from "../../../routes/AppRoute";
import { useValidateToken } from "../../../utils/UseValidateToken/useValidateToken";
import { styles } from "./style";
import { Error } from "../../../api/product/update/update";
import { NavigationBar } from "../../../components/NavigationBar";
import hardwareBackPress from "../../../utils/hardwareBackPress/hardwareBackPress";
import { ErrorModal } from "../../../components/ErrorModal";

export const SearchDeactivatedAdministrator = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [administrators, setAdministrators] = useState<Administrator[]>([]);
    const [error, setError] = useState<string>('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    useValidateToken();

    hardwareBackPress(navigate, "SearchAdministrator");

    useEffect(() => {
        loadAdministrators();
    }, []);

    const loadAdministrators = async () => {
        try {
            const result: Administrator[] | Error = await findByStatus(false);

            if (Array.isArray(result)) {
                setAdministrators(result);
            } else {
                setError('Erro ao carregar administradores: ' + result.message);
                setErrorModalVisible(true);
            }
        } catch {
            setError('Erro de conexão. Tente novamente mais tarde.');
            setErrorModalVisible(true);
        }
    };

    const handleActivate = (id: string, name: string) => {
        Alert.alert(
            'Atenção!',
            `Tem certeza que deseja ativar a conta de ${name}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Ativar',
                    style: 'default',
                    onPress: () => confirmActivate(id),
                },
            ]
        );
    };

    const confirmActivate = async (admId: string) => {
        try {
            const success = await activationById(admId);

            if (success) {
                Alert.alert('Sucesso', 'A conta do administrador foi ativada.');
                navigate('SearchAdministrator');
            } else {
                setError('Falha ao ativar a conta.');
            }
        } catch {
            setError('Erro ao processar a ativação.');
        }
    };

    return (
        <>
            <ScrollView style={styles.safeArea}>
                <View style={[styles.greetingContainer, { marginTop: 30 }]}>
                    <Text style={styles.greetingText}>Administradores Desativados</Text>
                    <Text style={styles.subtitle}>Reative contas de administradores</Text>
                </View>

                <ErrorModal
                    visible={errorModalVisible}
                    error={error}
                    onClose={() =>setErrorModalVisible(false)}
                />

                <View style={styles.listContainer}>
                    {administrators.length > 0 ? (
                        administrators.map((admin) => (
                            <ItemAdministrator
                                key={admin.id}
                                administrator={admin}
                                handleActivate={handleActivate}
                            />
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum administrador desativado encontrado.</Text>
                    )}
                </View>
            </ScrollView>
        </>
    );
};

type ItemAdministratorProps = {
    administrator: Administrator;
    handleActivate: (id: string, name: string) => void;
};

const ItemAdministrator = ({ administrator, handleActivate }: ItemAdministratorProps) => {
    return (
        <View style={styles.adminCard}>
            <Image
                source={
                    administrator.pathImage
                        ? { uri: administrator.pathImage }
                        : require('../../../assets/images/default_user.png')
                }
                style={styles.adminImage}
            />
            <Text style={styles.adminName}>{administrator.name}</Text>
            <View style={styles.adminActions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleActivate(administrator.id, administrator.name)}
                >
                    <Image
                        source={require('../../../assets/icons/activate.png')}
                        style={[styles.actionIcon, { width: 40, height: 40, marginLeft: 30 }]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
