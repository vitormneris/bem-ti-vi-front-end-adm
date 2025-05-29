import React from "react"
import { View } from "react-native"

import { useNavigation } from '@react-navigation/native';

import { InputItem } from "../InputItems/InputItem"
import { ButtonItem } from "../InputItems/ButtonItem"
import { InputImageItem } from "../InputItems/InputImageItem"

import { NavigationProps } from '../../../routes/index';

import { Product } from "../../../api/product/create/create"

import { styles } from "../style"

type ListProductProps = {
    products: Product[]
}

export const ListProduct = ({ products }: ListProductProps) => {
    return (
        <View style={styles.itemContainer}>
            {products.map((item: Product) => (
                <ItemProduct key={item.id} product={item} />
            ))}
        </View>
    )
}

type ItemProductProps = {
    product: Product
}

export const ItemProduct = ({ product }: ItemProductProps) => {
    const { navigate } = useNavigation<NavigationProps>();
    
    const productId = (product.id == null) ? "" : product.id;

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <InputItem label="Nome" value={product.name} />
                <InputItem label="Categoria" value={product.categories[0].name} />
                <InputItem label="Valor" value={product.price} />
                <InputImageItem label="Imagem do produto" imagem={product.pathImage} />
            </View>

            <View style={styles.actions}>
                <ButtonItem source={require('../../../assets/images/olhos.png')} />
                <ButtonItem 
                    source={require('../../../assets/images/configuracao.png')} 
                    onPress={() => navigate('ManageProduct', {id: productId})} 
                />
            </View>
        </View>
    )
}