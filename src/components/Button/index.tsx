import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

import { styles } from "./style"

export const Button = (props: any) => {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: props.color}]} onPress={props.action}>
            <Text style={styles.submitButtonText}>{props.text}</Text>
        </TouchableOpacity>
    )

}