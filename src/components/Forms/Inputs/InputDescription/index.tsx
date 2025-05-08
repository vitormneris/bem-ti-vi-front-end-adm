import React from "react"
import { Text, TextInput, View } from "react-native"

import { styles } from "./style"

export const InputDescription = (props: any) => {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                style={styles.descriptionInput}
                placeholder={props.placeholder}
                placeholderTextColor="#999"
                multiline
                keyboardType={props.keyboardType}
                value={props.value}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}