import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NavigationProps } from '../../routes/AppRoute';

import { styles } from './style';

export const AdministratorDeactivated = () => {
    const { replace } = useNavigation<NavigationProps>();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoSubText}>A sua conta está desativada, solicite a um administrador a ativação da conta ou logue-se com outra conta!</Text>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={() => replace("Login")}>
                <Text style={styles.loginButtonText}>Ir para o login</Text>
            </TouchableOpacity>
        </View>
    );
};
