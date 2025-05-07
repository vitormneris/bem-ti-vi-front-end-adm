import React from "react"
import { Text, View } from "react-native"

import { styles } from "./style"

export const Title = (props: any) => {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}> {props.text} </Text>
            <View style={styles.divider} />
        </View>
    )
} 