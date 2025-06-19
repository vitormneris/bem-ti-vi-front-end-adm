import React, { Dispatch, SetStateAction } from "react"
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native"

import { styles } from "./style"

export type InputProps = {
    label: string,
    placeholder: string,
    keyboardType: KeyboardTypeOptions,
    value: string,
    onChangeText: Dispatch<SetStateAction<string>>,
}

export const InputSmall = ({label, placeholder, keyboardType, value, onChangeText}: InputProps) => {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.inputField}
                placeholder={placeholder}
                placeholderTextColor="#999"
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}