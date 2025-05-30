import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '../../../components/NavigationBar';
import { SearchInput } from '../../../components/SearchInput';
import { Button } from '../../../components/Button';
import { PaginationControls } from '../../../components/PaginationControls';
import { ItemText } from '../../../components/Items/ItemText/ItemText';
import { ItemImage } from '../../../components/Items/ItemImage/ItemImage';
import { ItemButton } from '../../../components/Items/ItemButton/ItemButton';

import { NavigationProps } from '../../../routes/index';

import { ProductPages, search } from '../../../api/product/search/search';
import { Product } from '../../../api/product/create/create';
import { Category } from '../../../api/category/create/create';

import { styles } from './style';
import { stylesItem } from '../style';

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
                const data: ProductPages | undefined = await search(searchText, pageIndex);
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
                    icon={require('../../../assets/images/add.png')}
                    text="CADASTRAR"
                    color="#256489"
                    action={() => navigate('CreateProduct')}
                />

                <SearchInput
                    placeholder="Buscar produto..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />


                <View style={stylesItem.itemContainer}>
                    {filteredProdutos.map((item: Product) => (
                        <ItemProduct key={item.id} product={item} />
                    ))}
                </View>

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

type ItemProductProps = {
    product: Product
}

export const ItemProduct = ({ product }: ItemProductProps) => {
    const { navigate } = useNavigation<NavigationProps>();

    const productId = (product.id == null) ? "" : product.id;

    return (
        <View style={stylesItem.card}>
            <View style={stylesItem.info}>
                <ItemText label="Nome" value={product.name} />
                <ItemText label="Categoria" value={product.categories[0].name} />
                <ItemText label="Valor" value={product.price} />
                <ItemImage label="Imagem do produto" imagem={product.pathImage} />
            </View>

            <View style={stylesItem.actions}>
                <ItemButton source={require('../../../assets/images/olhos.png')} />
                <ItemButton
                    source={require('../../../assets/images/configuracao.png')}
                    onPress={() => navigate('ManageProduct', { id: productId })}
                />
            </View>
        </View>
    )
}