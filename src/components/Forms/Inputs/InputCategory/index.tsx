import React from "react"
import { Text, View } from "react-native"

import { Picker } from "@react-native-picker/picker"

import { styles } from "./style"

export const InputCategory = (props: any) => {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={styles.pickerWrapper}>
                {!props.category && (
                    <Text style={styles.pickerPlaceholder}>
                        Selecione uma categoria
                    </Text>
                )}
                <Picker
                    selectedValue={props.category}
                    onValueChange={props.setCategory}
                    style={styles.picker}
                >
                    {props.categories.map((item: any) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>
        </View>
    )
}