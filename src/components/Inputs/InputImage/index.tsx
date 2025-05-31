import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { styles } from "./style"

type InputImageProps = {
    label: string,
    image: string,
    selectImage: () => void
}

export const InputImage = ({  label, image, selectImage }: InputImageProps) => {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity style={[styles.imagePicker, image ? styles.imagePickerActive : null]} onPress={selectImage}>
                <Text style={[ styles.imagePickerText, image ? styles.imagePickerTextActive : null]}>
                    {image ? 'Imagem selecionada (clique para alterar)' : 'Selecione uma imagem'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
