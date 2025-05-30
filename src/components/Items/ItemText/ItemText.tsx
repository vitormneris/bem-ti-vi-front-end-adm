import React from 'react';
import { Text, View } from "react-native"

import { styles } from "./style"

export const ItemText = (props: any) => {
    return (
        <View>
            <Text style={styles.label}>{props.label}</Text>
            <Text style={styles.value}>{props.value}</Text>
        </View>
    )
}