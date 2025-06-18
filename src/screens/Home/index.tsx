import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useNavigation, } from "@react-navigation/native";

import { NavigationProps } from "../../routes/AppRoute";

import { useValidateToken } from "../../utils/UseValidateToken/useValidateToken";

import { styles } from "./style";
import { NavigationBar } from "../../components/NavigationBar";
import { Title } from "../../components/Title";

export const Home = () => {
    const { navigate } = useNavigation<NavigationProps>();

    useValidateToken();

    return (
        <View style={styles.screen}>

            <Title text={"Seja bem vindo!"} />

            <Button text="Agendamento" onPress={() => navigate("SearchAppointment")} />
            <Button text="Pedidos" onPress={() => navigate("SearchOrder")} />

            <NavigationBar />
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