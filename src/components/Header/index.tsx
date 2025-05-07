import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

import { styles } from "./style"

export const Header = (props: any) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
                <Image
                    source={require('../../assets/images/seta-voltar.png')}
                    style={styles.backIcon}
                />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Image
                    source={props.icon}
                    style={styles.menuIcon}
                />
            </View>
        </View>
    )
}