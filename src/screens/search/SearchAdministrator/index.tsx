import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Administrator } from "../../../api/administrator/create/create";
import { findByStatus } from "../../../api/administrator/search/findByStatus";
import { deactivationById } from "../../../api/administrator/delete/deactivationById";

import { NavigationProps } from "../../../routes/AppRoute";
import { Button } from "../../../components/Button";
import { useValidateToken } from "../../../utils/UseValidateToken/useValidateToken";
import { styles } from "./style";
import { Error } from "../../../api/product/update/update";
import { NavigationBar } from "../../../components/NavigationBar";
import hardwareBackPress from "../../../utils/hardwareBackPress/hardwareBackPress";
import { ErrorModal } from "../../../components/ErrorModal";

export const SearchAdministrator = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [administrators, setAdministrators] = useState<Administrator[]>([]);
    const [error, setError] = useState<string>('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    useValidateToken();
    hardwareBackPress(navigate, "ShowProfile");

    useEffect(() => {
        loadAdministrators();
    }, []);

    const loadAdministrators = async () => {
        try {
            const result: Administrator[] | Error = await findByStatus(true);

            if (Array.isArray(result)) {
                setAdministrators(result);
            } else {
                setError(result.message);
                setErrorModalVisible(true);
            }
        } catch {
            setError('Não foi possível atualizar. Verifique sua conexão.');
            setErrorModalVisible(true);
        }
    };

    const handleDeactivate = (id: string, name: string) => {
        Alert.alert(
            'Atenção!',
            `Tem certeza que deseja desativar a conta de ${name}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Desativar',
                    style: 'destructive',
                    onPress: () => confirmDeactivate(id),
                },
            ]
        );
    };

    const confirmDeactivate = async (admId: string) => {
        try {
            const result: boolean | Error = await deactivationById(admId);

            if (typeof result === "boolean") {
                Alert.alert('Sucesso', 'A conta do administrador foi desativada.');
                navigate('SearchDeactivatedAdministrator');
            } else {
                setError(result.message);
                setErrorModalVisible(true);
            }
        } catch {
            setError('Não foi possível atualizar. Verifique sua conexão.');
            setErrorModalVisible(true);
        }
    };

    return (
        <>
            <ScrollView style={styles.safeArea}>
                <View style={[styles.greetingContainer, { marginTop: 30 }]}>
                    <Text style={styles.greetingText}>Administradores cadastrados e ativos</Text>
                    <Text style={styles.subtitle}>Gerencie os administradores do sistema</Text>
                </View>

                <View style={styles.containerButton}>
                    <Button
                        icon={require('../../../assets/icons/add_user.webp')}
                        text="CRIAR ADM'S"
                        color="#256489"
                        width='45%'
                        action={() => navigate('CreateAdministrator')}
                    />
                    <Button
                        icon={require('../../../assets/icons/user_deactivated.png')}
                        text="ADM'S DES."
                        color="#256489"
                        width='45%'
                        action={() => navigate('SearchDeactivatedAdministrator')}
                    />
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
                                handleDeactivate={handleDeactivate}
                            />
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum administrador ativo encontrado.</Text>
                    )}
                </View>
            </ScrollView>
        </>
    );
};

type ItemAdministratorProps = {
    administrator: Administrator;
    handleDeactivate: (id: string, name: string) => void;
};

const ItemAdministrator = ({ administrator, handleDeactivate }: ItemAdministratorProps) => {
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
                    onPress={() => handleDeactivate(administrator.id, administrator.name)}
                >
                    <Image
                        source={require('../../../assets/icons/deactivate.png')}
                        style={[styles.actionIcon, { width: 40, height: 40, marginLeft: 30 }]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
