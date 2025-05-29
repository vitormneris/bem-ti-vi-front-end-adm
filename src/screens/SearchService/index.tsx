import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '../../components/NavigationBar';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';
import { ListService } from '../../components/ListItems/ListService';
import { PaginationControls } from '../../components/PaginationControls';

import { NavigationProps } from '../../routes/index';

import { Service } from '../../api/service/create/create';
import { search, ServicePages } from '../../api/service/search/search';

import { styles } from './style';

export const SearchService = () => {
    const { navigate } = useNavigation<NavigationProps>()
    const [searchText, setSearchText] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [servicos, setServicos] = useState<Service[]>([]);

    const filteredServicos : Service[] = servicos.filter(servico =>
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
                    icon={require('../../assets/images/add.png')}
                    text="CADASTRAR"
                    color="#256489"
                    action={() => navigate('CreateService')}
                />

                <SearchInput
                    placeholder="Buscar serviço..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <ListService services={filteredServicos} />

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
