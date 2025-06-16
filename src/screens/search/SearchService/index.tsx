import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View, } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '../../../components/NavigationBar';
import { SearchInput } from '../../../components/SearchInput';
import { Button } from '../../../components/Button';
import { PaginationControls } from '../../../components/PaginationControls';
import { ItemText } from '../../../components/Items/ItemText/ItemText';
import { ItemImage } from '../../../components/Items/ItemImage/ItemImage';
import { ItemButton } from '../../../components/Items/ItemButton/ItemButton';

import { NavigationProps } from '../../../routes/AppRoute';

import { Service } from '../../../api/service/create/create';
import { search, ServicePages } from '../../../api/service/search/search';


import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';

import { styles } from './style';
import { stylesItem } from '../style';

export const SearchService = () => {
    const { navigate } = useNavigation<NavigationProps>()
    const [searchText, setSearchText] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [servicos, setServicos] = useState<Service[]>([]);

    useValidateToken();

    const filteredServicos: Service[] = servicos.filter(servico =>
        servico.name.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            async function carregarServicos() {
                const data: ServicePages | undefined = await search(searchText, pageIndex);
                if (data != undefined) {
                    setServicos(data.services);
                    setTotalPages(data.totalPages);
                }
            }

            carregarServicos();
        }, 750);

        return () => clearTimeout(delayDebounce);
    }, [searchText, pageIndex]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                <Button
                    icon={require('../../../assets/images/add.png')}
                    text="CADASTRAR"
                    color="#256489"
                    action={() => navigate('CreateService')}
                />

                <SearchInput
                    placeholder="Buscar serviço..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <View style={stylesItem.itemContainer}>
                    {filteredServicos.map((item: Service) => (
                        <ItemService key={item.id} service={item} />
                    ))}
                </View>

                <PaginationControls
                    pageIndex={pageIndex}
                    totalPages={totalPages}
                    onNext={() => setPageIndex(prev => prev + 1)}
                    onPrev={() => setPageIndex(prev => prev - 1)}
                />

            </ScrollView>

            <NavigationBar initialTab='servicos' />
        </SafeAreaView>
    );
};

type ItemServiceProps = {
    service: Service
}

export const ItemService = ({ service }: ItemServiceProps) => {
    const { navigate } = useNavigation<NavigationProps>();

    const serviceId: string = (service.id == null) ? '' : service.id;

    return (

        <View style={stylesItem.card}>
            <View style={stylesItem.info}>

                <ItemText label="Nome do Serviço" value={service.name} />

                <ItemText label="Preço" value={service.price} />

                <ItemImage label="Imagem" imagem={service.pathImage} />
            </View>

            <View style={stylesItem.actions}>
                <ItemButton source={require('../../../assets/images/configuracao.png')} onPress={() => navigate('ManageService', { id: serviceId })} />
            </View>
        </View>
    )
}