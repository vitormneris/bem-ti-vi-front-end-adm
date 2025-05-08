import React from "react"
import { View } from "react-native"

import { InputItem } from "../InputItems/InputItem"
import { ButtonItem } from "../InputItems/ButtonItem"

import { styles } from "../style"

export const ListProduct = (props: any) => {
    return (
        <View style={styles.itemContainer}>
            {props.filteredItems.map((item: any) => (
                <ItemService
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    price={item.price}
                />
            ))}
        </View>
    )
}

export const ItemService = (props: any) => {
    return (
        <View key={props.id} style={styles.card}>
            <View style={styles.info}>
                <InputItem label="Nome" value={props.name} />
                <InputItem label="Categoria" value={props.category} />
                <InputItem label="Valor" value={props.price} />
            </View>

            <View style={styles.actions}>
                <ButtonItem source={require('../../../assets/images/olhos.png')} />
                <ButtonItem source={require('../../../assets/images/configuracao.png')} />
            </View>
        </View>
    )
}