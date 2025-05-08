import React from "react"
import { View } from "react-native"

import { InputItem } from "../InputItems/InputItem"
import { ButtonItem } from "../InputItems/ButtonItem"
import { InputImageItem } from "../InputItems/InputImageItem"

import { styles } from "../style"

export const ListCategory = (props: any) => {
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
                <InputItem label="Nome da Categoria" value={props.name} />
                <InputImageItem label="Imagem da categoria" image={props.imagem} />
            </View>

            <View style={styles.actions}>
                <ButtonItem source={require('../../../assets/images/olhos.png')} />
                <ButtonItem source={require('../../../assets/images/configuracao.png')} />
            </View>
        </View>
    )
}