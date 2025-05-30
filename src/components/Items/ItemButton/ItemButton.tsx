import React from 'react';
import { Text, TouchableOpacity, View } from "react-native"

import { styles } from "./style"
import { Image } from 'react-native';

export const ItemButton = (props: any) => {
    return (
        <>
        <TouchableOpacity onPress={props.onPress}>
            <Image source={props.source} style={styles.actionIcon} />
        </TouchableOpacity>
        </>
    )
}
