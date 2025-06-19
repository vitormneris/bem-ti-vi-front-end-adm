import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, SafeAreaView, View, Text, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '../../../components/NavigationBar';
import { SearchInput } from '../../../components/SearchInput';
import { Button } from '../../../components/Button';
import { PaginationControls } from '../../../components/PaginationControls';
import { ItemText } from '../../../components/Items/ItemText/ItemText';
import { ItemImage } from '../../../components/Items/ItemImage/ItemImage';
import { ItemButton } from '../../../components/Items/ItemButton/ItemButton';

import { NavigationProps } from '../../../routes/AppRoute';

import { CategoryPages, search } from '../../../api/category/search/search';
import { Category } from '../../../api/category/create/create';

import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';

import { styles } from './style';
import { stylesItem } from '../style';
import { ButtonLarge } from '../../../components/ButtonLarge';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';

export const SearchCategory = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [searchText, setSearchText] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [categorias, setCategorias] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useValidateToken();

    hardwareBackPress(navigate, "Home");

    const carregarCategorias = useCallback(async (textoBusca: string, pagina: number) => {
        setLoading(true);
        setError('');
        try {
            const data: CategoryPages | undefined = await search(textoBusca, pagina);
            if (data) {
                setCategorias(data.categories);
                setTotalPages(data.totalPages);
            } else {
                setCategorias([]);
                setTotalPages(1);
                setError('Nenhuma categoria encontrada.');
            }
        } catch {
            setCategorias([]);
            setTotalPages(1);
            setError('Erro ao carregar categorias. Verifique sua conexão.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setPageIndex(0);
            carregarCategorias(searchText, 0);
        }, 600);

        return () => clearTimeout(delayDebounce);
    }, [searchText, carregarCategorias]);

    useEffect(() => {
        carregarCategorias(searchText, pageIndex);
    }, [pageIndex, searchText, carregarCategorias]);

    const filteredCategorias = categorias.filter(category =>
        category.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleNextPage = () => {
        if (pageIndex + 1 < totalPages) setPageIndex(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (pageIndex > 0) setPageIndex(prev => prev - 1);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <ButtonLarge
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

                {error ? (
                    <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10 }}>{error}</Text>
                ) : null}

                <View style={stylesItem.itemContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#256489" style={{ marginTop: 20 }} />
                    ) : filteredCategorias.length > 0 ? (
                        filteredCategorias.map((item: Category) => (
                            <ItemCategory key={item.id} category={item} />
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma categoria encontrada.</Text>
                    )}
                </View>
            </ScrollView>

            <PaginationControls
                pageIndex={pageIndex}
                totalPages={totalPages}
                onNext={handleNextPage}
                onPrev={handlePrevPage}
            />

            <NavigationBar initialTab="categorias" />
        </SafeAreaView>
    );
};


type ItemCategoryProps = {
    category: Category;
};

export const ItemCategory = ({ category }: ItemCategoryProps) => {
    const { navigate } = useNavigation<NavigationProps>();

    const categoryId = category.id ?? '';

    return (
        <View style={stylesItem.card}>
            <View style={stylesItem.info}>
                <ItemText label="Nome da categoria" value={category.name} />
                <ItemImage label="Imagem" imagem={category.pathImage} />
            </View>

            <View style={stylesItem.actions}>
                <ItemButton
                    source={require('../../../assets/images/configuracao.png')}
                    onPress={() => navigate('ManageCategory', { id: categoryId })}
                />
            </View>
        </View>
    );
};
