import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes";
import { styles } from "./style";

export const Home = () => {
    const { navigate } = useNavigation<NavigationProps>();

    return (
        <View style={styles.screen}>

            <Button text="Cadastrar produto" onPress={() => navigate("CreateProduct")} />
            <Button text="Pesquisar produto" onPress={() => navigate("SearchProduct")} />

            <Button text="Cadastrar serviço" onPress={() => navigate("CreateService")} />
            <Button text="Pesquisar serviço" onPress={() => navigate("SearchService")} />

            <Button text="Cadastrar categoria" onPress={() => navigate("CreateCategory")} />
            <Button text="Pesquisar categoria" onPress={() => navigate("SearchCategory")} />
        
            <Button text="Login" onPress={() => navigate("Login")} />
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