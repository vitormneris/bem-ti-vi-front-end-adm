import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

import { NavigationProps } from "../../routes/AppRoute";

import { styles } from "./style";

type HeaderProps = {
    title: string;
    activateBackButton: boolean;
    iconName: string;
    backScreen: any;
    needProps: boolean;
    props: any | null; 
};

export const Header = ({ title, activateBackButton, iconName, backScreen, needProps, props }: HeaderProps) => {
    const { navigate } = useNavigation<NavigationProps>();

    const back = () => {
        if (backScreen != null) {
            if (needProps) {
                navigate(backScreen, props);
            } else {
                navigate(backScreen);

            }
        }
    }

    return (
        <View style={styles.header}>
            {activateBackButton && (
                <TouchableOpacity style={styles.backButton} onPress={() => back()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            )}

            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Icon name={iconName} size={24} color="#000" style={styles.menuIcon} />
            </View>
        </View>
    );
};
