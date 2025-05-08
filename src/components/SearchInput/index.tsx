import React from "react"
import { Image, TextInput, View } from "react-native"

import { styles } from "./style"

export const SearchInput = (props: any) => {
    return (
        <View style={styles.searchContainer}>
            <Image
                source={require('../../assets/images/busca.png')}
                style={styles.searchIcon}
            />
            <TextInput
                style={styles.searchInput}
                placeholder={props.placeholder}
                placeholderTextColor="#999"
                value={props.searchText}
                onChangeText={props.setSearchText}
            />
        </View>
    )
} 