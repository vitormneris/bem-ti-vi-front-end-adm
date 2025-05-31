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

import { NavigationProps } from "../../../routes/AppRoute";

import { CategoryPages, search } from '../../../api/category/search/search';
import { Category } from '../../../api/category/create/create';

import { styles } from './style';
import { stylesItem } from '../style';
import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';

export const SearchCategory = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [searchText, setSearchText] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [categorias, setCategorias] = useState<Category[]>([]);

    useValidateToken();

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
    }, [searchText, pageIndex]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                <Button
                    icon={require('../../../assets/images/add.png')}
                    text="CADASTRAR"
                    color="#256489"
                    action={() => navigate('CreateCategory')}
                />

                <SearchInput
                    placeholder="Buscar categoria..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <View style={stylesItem.itemContainer}>
                    {filteredCategorias.map((item: Category) => (
                        <ItemCategory key={item.id} category={item} />
                    ))}
                </View>

                <PaginationControls
                    pageIndex={pageIndex}
                    totalPages={totalPages}
                    onNext={() => setPageIndex(prev => prev + 1)}
                    onPrev={() => setPageIndex(prev => prev - 1)}
                />

            </ScrollView>

            <NavigationBar initialTab='categorias' />
        </SafeAreaView>
    );
};

type ItemCategoryProps = {
    category: Category
}

export const ItemCategory = ({ category }: ItemCategoryProps) => {
    const { navigate } = useNavigation<NavigationProps>();

    const categoryId = (category.id == null) ? '' : category.id;

    return (
        <View key={categoryId} style={stylesItem.card}>
            <View style={stylesItem.info}>
                <ItemText label="Nome das Categoria" value={category.name} />
                <ItemImage label="Imagem da categoria" imagem={category.pathImage} />
            </View>

            <View style={stylesItem.actions}>
                <ItemButton source={require('../../../assets/images/olhos.png')} />
                <ItemButton source={require('../../../assets/images/configuracao.png')} onPress={() => navigate('ManageCategory', { categoryId: categoryId })} />
            </View>
        </View>
    )
}
