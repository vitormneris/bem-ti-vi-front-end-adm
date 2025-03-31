import { Text, View } from "react-native"
import { styles } from "./style"
import { Component } from "../../components/Component"

export const Home = () => {
    return (
        <View>
            <Text style={styles.title}>Hello world</Text>
            <Component />
        </View>        
    )
}