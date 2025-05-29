import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '../../components/NavigationBar';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';
import { ListProduct } from '../../components/ListItems/ListProduct';
import { PaginationControls } from '../../components/PaginationControls';

import { NavigationProps } from '../../routes/index';

import { ProductPages, searchProduct } from '../../api/product/search/search';
import { Product } from '../../api/product/create/create';
import { Category } from '../../api/category/create/create';

import { styles } from './style';

export const SearchProduct = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [searchText, setSearchText] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [produtos, setProdutos] = useState<Product[]>([]);

    const filteredProdutos: Product[] = produtos.filter(produto =>
        produto.name.toLowerCase().includes(searchText.toLowerCase()) ||
        produto.categories.some((c: Category) => c.name.toLowerCase() == searchText.toLowerCase())
    );

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            async function carregarProdutos() {
                const data: ProductPages | undefined = await searchProduct(searchText, pageIndex);
                if (data != undefined) {
                    setProdutos(data.product);
                    setTotalPages(data.totalPages);
                }
            }

            carregarProdutos();
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
                    action={() => navigate('CreateProduct')}
                />

                <SearchInput
                    placeholder="Buscar produto..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <ListProduct products={filteredProdutos} />

                <PaginationControls
                    pageIndex={pageIndex}
                    totalPages={totalPages}
                    onNext={() => setPageIndex(prev => prev + 1)}
                    onPrev={() => setPageIndex(prev => prev - 1)}
                />

            </ScrollView>

            <NavigationBar initialTab='loja' />
        </SafeAreaView>
    );
};