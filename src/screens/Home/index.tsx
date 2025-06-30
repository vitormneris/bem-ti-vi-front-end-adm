import React, { useEffect, useState } from "react";
import { BackHandler, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/AppRoute";
import { useValidateToken } from "../../utils/UseValidateToken/useValidateToken";
import { styles } from "./style";
import { NavigationBar } from "../../components/NavigationBar";
import { Title } from "../../components/Title";
import Toast from "react-native-toast-message";
import { MaterialIcons } from '@expo/vector-icons';

export const Home = () => {
    const { navigate } = useNavigation<NavigationProps>();
    useValidateToken();

    const [counter, setCounter] = useState<number>(0);
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            setCounter(prevCounter => {
                const newCounter = prevCounter + 1;

                if (newCounter >= 2) {
                    BackHandler.exitApp();
                } else {
                    ToastAndroid.show('Pressione novamente para sair', ToastAndroid.SHORT);
                }

                return newCounter;
            });

            return true;
        });

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <Title text={"Seja bem vindo!"} style={styles.welcomeTitle} />
                
                <View style={styles.buttonsContainer}>
                    <Button 
                        text="Agendamento" 
                        icon="event" 
                        onPress={() => navigate("SearchAppointment")} 
                    />
                    <Button 
                        text="Pedidos" 
                        icon="shopping-bag" 
                        onPress={() => navigate("SearchOrder")} 
                    />
                    <Button 
                        text="Clientes" 
                        icon="people" 
                        onPress={() => navigate("SearchCustomer")} 
                    />
                </View>
            </View>

            <NavigationBar initialTab="home" />
        </View>
    );
};

interface ButtonProps {
    text: string;
    icon: string;
    onPress: () => void;
}

function Button({ text, icon, onPress }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.buttonContent}>
                <MaterialIcons name={icon as any} size={28} color="#256489" />
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}