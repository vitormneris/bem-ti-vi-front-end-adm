import React from 'react';
import { Text, View } from "react-native"

import { styles } from "./style"
import { Image } from 'react-native';

export const ItemImage = (props: any) => {
    return (
        <>
            <Text style={styles.label}>{props.label}</Text>
            <Image source={{ uri: props.imagem }} style={styles.image} />
        </>
    )
}