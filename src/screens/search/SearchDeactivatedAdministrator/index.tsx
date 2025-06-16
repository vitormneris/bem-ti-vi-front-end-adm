import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image, Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Administrator } from "../../../api/administrator/create/create";
import { findByStatus } from "../../../api/administrator/search/findByStatus";
import { deactivationById } from "../../../api/administrator/delete/deactivationById";

import { NavigationProps } from "../../../routes/AppRoute";

import { SearchInput } from "../../../components/SearchInput";
import { Button } from "../../../components/Button";

import { useValidateToken } from "../../../utils/UseValidateToken/useValidateToken";

import { styles } from "./style";
import { activationById } from "../../../api/administrator/delete/activationById";

export const SearchDeactivatedAdministrator = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [searchText, setSearchText] = useState<string>('');
    const [administrators, setAdministrators] = useState<Administrator[]>([]);

    useValidateToken();

    useEffect(() => {
        async function loadAdministrators() {
            try {
                const administrators: Administrator[] | undefined = await findByStatus(false);
                if (administrators != undefined) {
                    setAdministrators(administrators);
                }
            } catch (error) {
                console.error('Erro ao carregar administradores:', error);
            }
        }
        loadAdministrators();
    }, []);

    const handleDeactivate = async (id: string, name: string) => {
        Alert.alert(
            'Atenção!',
            'Tem certeza que deseja ativar a conta de ' + name + '?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Ativar',
                    style: 'destructive',
                    onPress: () => confirmDeactivate(id),
                },
            ]
        );
    };

    const confirmDeactivate = async (admId: string) => {
        try {
            const success = await activationById(admId);

            if (success) {
                Alert.alert('Sucesso!', 'A conta do administrador foi sativada.');
                navigate('SearchAdministrator')
            }

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível ativar a conta do administrador.');
        }
    };

    return (
        <ScrollView style={styles.safeArea} contentContainerStyle={styles.scrollContent}>

            <View style={[styles.greetingContainer, { marginTop: 30 }]}>
                <Text style={styles.greetingText}>Administradores Desativados</Text>
            </View>

            <View style={styles.listContainer}>
                {administrators.map((admin) => (
                    <ItemAdministrator 
                        key={admin.id} 
                        administrator={admin} 
                        handleDeactivate={handleDeactivate} 
                        admName={admin.name}
                        admId={admin.id}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

type ItemAdministratorProps = {
    administrator: Administrator,
    handleDeactivate: any,
    admName: string,
    admId: string
}

export const ItemAdministrator = ({ administrator, handleDeactivate, admName, admId }: ItemAdministratorProps) => {

    return (
        <View key={administrator.id} style={styles.adminCard}>
            <Image source={{ uri: administrator.pathImage || '' }} style={styles.adminImage} />
            <Text style={styles.adminName}>{administrator.name}</Text>
            <View style={styles.adminActions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {handleDeactivate(admId, admName)}}
                >
                    <Image
                        source={require('../../../assets/images/desabilitar.png')}
                        style={[styles.actionIcon, { width: 40, height: 40, marginLeft: 30 }]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}