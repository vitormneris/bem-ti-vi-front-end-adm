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

export const SearchAdministrator = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [administrators, setAdministrators] = useState<Administrator[]>([]);
    const [error, setError] = useState<string>('');

    useValidateToken();

    useEffect(() => {
        loadAdministrators();
    }, []);

    const loadAdministrators = async () => {
        try {
            const result: Administrator[] | Error = await findByStatus(true);

            if (Array.isArray(result)) {
                setAdministrators(result);
            } else {
                setError('Erro ao carregar administradores: ' + result.message);
            }
        } catch {
            setError('Não foi possível atualizar. Verifique sua conexão.');
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
            }
        } catch {
            setError('Não foi possível atualizar. Verifique sua conexão.');
        }
    };

    return (
        <ScrollView style={styles.safeArea} contentContainerStyle={styles.scrollContent}>
            <View style={[styles.greetingContainer, { marginTop: 30 }]}>
                <Text style={styles.greetingText}>Administradores Cadastrados</Text>
                <Text style={styles.subtitle}>Gerencie os administradores do sistema</Text>
            </View>

            <View style={styles.containerButton}>
                <Button
                    icon={require('../../../assets/images/add.png')}
                    text="CADASTRAR"
                    color="#256489"
                    action={() => navigate('CreateAdministrator')}
                />
                <Button
                    icon={require('../../../assets/images/perfil.png')}
                    text="DESATIVADAS"
                    color="#256489"
                    action={() => navigate('SearchDeactivatedAdministrator')}
                />
            </View>

            {error.length > 0 && (
                <Text style={[styles.subtitle, { color: 'red', textAlign: 'center', marginVertical: 10 }]}>
                    {error}
                </Text>
            )}

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
                        source={require('../../../assets/images/desabilitar.png')}
                        style={[styles.actionIcon, { width: 40, height: 40, marginLeft: 30 }]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
