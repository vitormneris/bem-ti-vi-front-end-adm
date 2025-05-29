import React from "react"
import { Text, View } from "react-native"

import { InputItem } from "../InputItems/InputItem"
import { ButtonItem } from "../InputItems/ButtonItem"
import { InputImageItem } from "../InputItems/InputImageItem"

import { styles } from "../style"
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../routes/index';
import { Service } from "../../../api/service/create/create"

type ListServiceProps = {
    services: Service[]
}

export const ListService = ({ services }: ListServiceProps) => {
    return (
        <View style={styles.itemContainer}>
            {services.map((item: Service) => (
                <ItemService key={item.id} service={item} />
            ))}
        </View>
    )
}

type ItemServiceProps = {
    service: Service
}

export const ItemService = ({ service }: ItemServiceProps) => {
    const { navigate } = useNavigation<NavigationProps>();

    const serviceId: string = (service.id == null) ? '' : service.id;

    return (

        <View style={styles.card}>
            <View style={styles.info}>

                <InputItem label="Nome do Serviço" value={service.name} />

                {/* <InputItem label="Preço" value={service.price} /> */}

                <Text style={styles.label}>Preço</Text>
                <Text style={[styles.value, { marginBottom: 10 }]}> {service.price} </Text>

                <InputImageItem label="Imagem" imagem={service.pathImage} />
            </View>

            <View style={styles.actions}>
                <ButtonItem source={require('../../../assets/images/olhos.png')} />
                <ButtonItem source={require('../../../assets/images/configuracao.png')} onPress={() => navigate('ManageService', { id: serviceId })} />
            </View>
        </View>
    )
}

