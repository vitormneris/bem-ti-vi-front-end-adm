import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { styles } from "./style"

export const InputImage = (props: any) => {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{props.label}</Text>
            <TouchableOpacity
                style={[
                    styles.imagePicker,
                    props.image ? styles.imagePickerActive : null
                ]}
                onPress={props.selectImage}
            >
                <Text style={[
                    styles.imagePickerText,
                    props.image ? styles.imagePickerTextActive : null
                ]}>
                    {props.image ? 'Imagem selecionada (clique para alterar)' : 'Selecione uma imagem'}
                </Text>
            </TouchableOpacity>
        </View>

    )
}