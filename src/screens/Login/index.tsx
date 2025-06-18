import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GLOBAL_VAR } from '../../api/config/globalVar';
import { login, UserAuth } from '../../api/auth/login/login';

import { NavigationProps } from '../../routes/AppRoute';

import { styles } from './style';

export const Login = () => {
    const { replace } = useNavigation<NavigationProps>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const sendRequestLogin = async () => {
        const userAuth: UserAuth = {
            email: email,
            password: password,
        };

        try {
            const response = await login(userAuth);

            if ('token' in response) {
                setEmail('');
                setPassword('');
                setError('');
                GLOBAL_VAR.TOKEN_JWT = response.token;
                replace('Home');
            } else {
                setError(response.message);
            }

        } catch (error) {
            setError('Não foi possível fazer o login. Verifique sua conexão.');
        }
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp(); 
            return true;
        });

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.logoSubText}>LOGIN</Text>
            </View>

            <View style={styles.inputContainer}>
                <Image
                    source={require('../../assets/images/e-mail.png')}
                    style={styles.inputIcon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#256489"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={toggleShowPassword}>
                    <Image
                        source={showPassword
                            ? require('../../assets/images/olhando.png')
                            : require('../../assets/images/senha.png')}
                        style={styles.inputIcon}
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#256489"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={sendRequestLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.error}>{error}</Text>
        </View>
    );
};
