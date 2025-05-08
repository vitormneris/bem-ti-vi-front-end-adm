import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from './style';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
      <TouchableOpacity style={styles.loginButton}>
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
