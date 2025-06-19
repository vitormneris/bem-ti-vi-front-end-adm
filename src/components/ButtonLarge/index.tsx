import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

import { styles } from "./style"

export const ButtonLarge = (props: any) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, { backgroundColor: props.color, width: props.width }]} onPress={props.action}>
                <Image source={props.icon} style={styles.icon} />
                <Text style={styles.text}> {props.text}</Text>
            </TouchableOpacity>
        </View>
    )

}