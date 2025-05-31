import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Administrator } from "../../../api/administrator/create/create";
import { findAll } from "../../../api/administrator/search/findAll";

import { NavigationProps } from "../../../routes/AppRoute";

import { SearchInput } from "../../../components/SearchInput";
import { Button } from "../../../components/Button";

import { useValidateToken } from "../../../utils/UseValidateToken/useValidateToken";

import { styles } from "./style";

export const SearchAdministrator = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [searchText, setSearchText] = useState<string>('');
    const [administrators, setAdministrators] = useState<Administrator[]>([]);

    useValidateToken();

    useEffect(() => {
        async function loadAdministrators() {
            try {
                const administrators: Administrator[] | undefined = await findAll();
                if (administrators != undefined) {
                    setAdministrators(administrators);
                }
            } catch (error) {
                console.error('Erro ao carregar administradores:', error);
            }
        }
        loadAdministrators();
    }, []);

    return (
        <ScrollView style={styles.safeArea} contentContainerStyle={styles.scrollContent}>

            <View style={[styles.greetingContainer, { marginTop: 30 }]}>
                <Text style={styles.greetingText}>Administradores Cadastrados</Text>
                <Text style={styles.subtitle}>Gerencie os administradores do sistema</Text>
            </View>

            <Button
                icon={require('../../../assets/images/add.png')}
                text="CADASTRAR"
                color="#256489"
                action={() => navigate('CreateProduct')}
            />

            <SearchInput
                placeholder="Buscar produto..."
                searchText={searchText}
                setSearchText={setSearchText}
            />

            <View style={styles.listContainer}>
                {administrators.map((admin) => (
                    <ItemAdministrator key={admin.id} administrator={admin} />
                ))}
            </View>
        </ScrollView>
    );
};

type ItemAdministratorProps = {
    administrator: Administrator
}

export const ItemAdministrator = ({ administrator }: ItemAdministratorProps) => {

    return (
        <View key={administrator.id} style={styles.adminCard}>
            <Image source={{ uri: administrator.pathImage || '' }} style={styles.adminImage} />
            <Text style={styles.adminName}>{administrator.name}</Text>
            <View style={styles.adminActions}>
                <TouchableOpacity
                    style={styles.actionButton}
                >
                    <Image
                        source={require('../../../assets/images/desabilitar.png')}
                        style={[styles.actionIcon, { width: 40, height: 40, marginLeft: 30 }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton]}
                >
                    <Image
                        source={require('../../../assets/images/deletar.png')}
                        style={[styles.actionIcon, { width: 40, height: 40 }]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}