import React from "react"
import { Text } from "react-native"

import { styles } from "./style"

export const InputItem = (props: any) => {
    return (
        <>
            <Text style={styles.label}>{props.label}</Text>
            <Text style={styles.value}>{props.value}</Text>
        </>
    )
}
