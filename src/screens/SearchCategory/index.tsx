import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '../../components/NavigationBar';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';
import { ListCategory } from '../../components/ListItems/ListCategory';
import { PaginationControls } from '../../components/PaginationControls';

import { NavigationProps } from '../../routes/index';

import { CategoryPages, search } from '../../api/category/search/search';
import { Category } from '../../api/category/create/create';

import { styles } from './style';

export const SearchCategory = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [searchText, setSearchText] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [categorias, setCategorias] = useState<Category[]>([]);

    const filteredCategorias = categorias.filter(category =>
        category.name.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            async function carregarCategorias() {
                const data: CategoryPages | undefined = await search(searchText, pageIndex);
                if (data != undefined) {
                    setCategorias(data.categories);
                    setTotalPages(data.totalPages);   
                }
            }

            carregarCategorias();
        }, 750);

        return () => clearTimeout(delayDebounce);
    }, [searchText,pageIndex]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                <Button 
                    icon={require('../../assets/images/add.png')} 
                    text="CADASTRAR" 
                    color="#256489" 
                    action={() => navigate('CreateCategory')} 
                />

                <SearchInput
                    placeholder="Buscar categoria..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                {/* Lista de Categorias */}
                <ListCategory categories={filteredCategorias} />

                <PaginationControls 
                    pageIndex={pageIndex}
                    totalPages={totalPages}
                    onNext={()=>setPageIndex(prev => prev + 1)}
                    onPrev={()=>setPageIndex(prev => prev - 1)}
                />

            </ScrollView>

            <NavigationBar initialTab='categorias'/>
        </SafeAreaView>
    );
};
