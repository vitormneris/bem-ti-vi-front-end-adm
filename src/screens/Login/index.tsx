import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { login, Token, UserAuth } from '../../api/auth/login/login';
import { NavigationProps } from '../../routes/AppRoute';

import styles from './style';

import { GLOBAL_VAR } from '../../api/config/globalVar';

export const Login = () => {
    const { navigate } = useNavigation<NavigationProps>();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const sendRequestLogin = async () => {
        const userAuth: UserAuth = {
            email: email,
            password: password,
        };

        try {
            const token: Token = await login(userAuth);
            if (token) {
                setEmail('');
                setPassword('');
                GLOBAL_VAR.TOKEN_JWT = token.token;
                Alert.alert('Sucesso!', 'O login foi feito com sucesso!');
                navigate("Home")
            }
        } catch (error) {
            console.error('POST request failed:', error);
            Alert.alert('Erro', 'Não foi possível fazer o login.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.logoSubText}>LOGIN</Text>
            </View>

            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={sendRequestLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Register Link */}
            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Não possui conta?</Text>
                <TouchableOpacity>
                    <Text style={styles.registerLink}> Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
