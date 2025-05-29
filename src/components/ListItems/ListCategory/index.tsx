import React from "react"
import { View } from "react-native"

import { useNavigation } from '@react-navigation/native';

import { InputItem } from "../InputItems/InputItem"
import { ButtonItem } from "../InputItems/ButtonItem"
import { InputImageItem } from "../InputItems/InputImageItem"

import { NavigationProps } from '../../../routes/index';

import { Category } from "../../../api/category/create/create"

import { styles } from "../style"

type ListCategoryProps = {
    categories: Category[]
}

export const ListCategory = ({ categories }: ListCategoryProps) => {
    return (
        <View style={styles.itemContainer}>
            {categories.map((item: Category) => (
                <ItemCategory key={item.id} category={item} />
            ))}
        </View>
    )
}

type ItemCategoryProps = {
    category: Category
}

export const ItemCategory = ({ category }: ItemCategoryProps) => {
    const { navigate } = useNavigation<NavigationProps>();

    const categoryId = (category.id == null) ? '' : category.id; 

    return (
        <View key={categoryId} style={styles.card}>
            <View style={styles.info}>
                <InputItem label="Nome das Categoria" value={category.name} />
                <InputImageItem label="Imagem da categoria" imagem={category.pathImage} />
            </View>

            <View style={styles.actions}>
                <ButtonItem source={require('../../../assets/images/olhos.png')} />
                <ButtonItem source={require('../../../assets/images/configuracao.png')} onPress={() => navigate('ManageCategory', {id: categoryId})} />
            </View>
        </View>
    )
}