import React from "react"
import { Text, View } from "react-native"

import { InputItem } from "../InputItems/InputItem"
import { ButtonItem } from "../InputItems/ButtonItem"
import { InputImageItem } from "../InputItems/InputImageItem"

import { styles } from "../style"

export const ListService = (props: any) => {
    return (
        <View style={styles.itemContainer}>
            {props.filteredItems.map((item: any) => (
                <ItemService
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                />
            ))}
        </View>
    )
}

export const ItemService = (props: any) => {
    return (

        <View key={props.id} style={styles.card}>
            <View style={styles.info}>
   
                <InputItem label="Nome do Serviço" value={props.name} />
                
                {/* <InputItem label="Preço" value={props.price} /> */}

                <Text style={styles.label}>Preço</Text>
                <Text style={[styles.value, { marginBottom: 10 }]}> {props.price} </Text>

                <InputImageItem label="Imagem" image={ props.imagem } />                
            </View>

            <View style={styles.actions}>
                <ButtonItem source={require('../../../assets/images/olhos.png')} />
                <ButtonItem source={require('../../../assets/images/configuracao.png')} />
            </View>
        </View>
    )
}

