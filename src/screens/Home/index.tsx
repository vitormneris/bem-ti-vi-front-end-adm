import React, { useEffect, useState } from "react";
import { BackHandler, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

import { useNavigation, } from "@react-navigation/native";

import { NavigationProps } from "../../routes/AppRoute";

import { useValidateToken } from "../../utils/UseValidateToken/useValidateToken";

import { styles } from "./style";
import { NavigationBar } from "../../components/NavigationBar";
import { Title } from "../../components/Title";
import Toast from "react-native-toast-message";

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

            <View>
                <Title text={"Seja bem vindo!"} />

                <Button text="Agendamento" onPress={() => navigate("SearchAppointment")} />
                <Button text="Pedidos" onPress={() => navigate("SearchOrder")} />
                <Button text="Clientes" onPress={() => navigate("SearchCustomer")} />
            </View>

            <NavigationBar initialTab="home" />
        </View>
    );
};

interface ButtonProps {
    text: string;
    onPress: () => void;
}

function Button({ text, onPress }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}