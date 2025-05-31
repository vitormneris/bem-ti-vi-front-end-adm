import React, { Dispatch, SetStateAction } from "react"
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native"

import { InputProps } from "../Input"

import { styles } from "./style"

export const InputDescription = ({label, placeholder, keyboardType, value, onChangeText}: InputProps) => {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.descriptionInput}
                placeholder={placeholder}
                placeholderTextColor="#999"
                multiline
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}