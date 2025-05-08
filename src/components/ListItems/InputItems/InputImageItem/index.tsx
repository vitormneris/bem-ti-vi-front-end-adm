import React from "react"
import { Image, Text } from "react-native"

import { styles } from "./style"

export const InputImageItem = (props: any) => {
    return (
        <>
            <Text style={styles.label}>{props.label}</Text>
            <Image source={{ uri: props.imagem }} style={styles.image} />
        </>
    )
}
