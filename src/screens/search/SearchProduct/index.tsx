import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, SafeAreaView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '../../../components/NavigationBar';
import { SearchInput } from '../../../components/SearchInput';
import { Button } from '../../../components/Button';
import { PaginationControls } from '../../../components/PaginationControls';
import { ItemText } from '../../../components/Items/ItemText/ItemText';
import { ItemImage } from '../../../components/Items/ItemImage/ItemImage';
import { ItemButton } from '../../../components/Items/ItemButton/ItemButton';

import { NavigationProps } from '../../../routes/AppRoute';

import { ProductPages, search } from '../../../api/product/search/search';
import { Product,Category } from '../../../utils/Types';

import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';

import { stylesItem } from '../style';
import { styles } from './style';
import { ButtonLarge } from '../../../components/ButtonLarge';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../../components/ErrorModal';

export const SearchProduct = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [searchText, setSearchText] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [produtos, setProdutos] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    useValidateToken();

    hardwareBackPress(navigate, "Home");

    const carregarProdutos = useCallback(async (textoBusca: string, pagina: number) => {
        setLoading(true);
        setError('');
        try {
            const dados: ProductPages | undefined = await search(textoBusca, pagina);
            if (dados) {
                setProdutos(dados.product);
                setTotalPages(dados.totalPages);
            } else {
                setProdutos([]);
                setTotalPages(1);
                setError('Nenhum produto encontrado.');
            }
        } catch {
            setProdutos([]);
            setTotalPages(1);
            setError('Erro ao carregar produtos. Verifique sua conexão.');
            setErrorModalVisible(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setPageIndex(0);
            carregarProdutos(searchText, 0);
        }, 600);

        return () => clearTimeout(delayDebounce);
    }, [searchText, carregarProdutos]);

    useEffect(() => {
        carregarProdutos(searchText, pageIndex);
    }, [pageIndex, searchText, carregarProdutos]);

    const produtosFiltrados = produtos.filter(produto =>
        produto.name.toLowerCase().includes(searchText.toLowerCase()) ||
        produto.categories.some((c: Category) =>
            c.name.toLowerCase().includes(searchText.toLowerCase())
        )
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
                    action={() => navigate('CreateProduct')}
                />

                <SearchInput
                    placeholder="Buscar produto..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <ErrorModal
                    visible={errorModalVisible}
                    error={error}
                    onClose={() =>setErrorModalVisible(false)}
                />

                <View style={stylesItem.itemContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#256489" style={{ marginTop: 20 }} />
                    ) : produtosFiltrados.length > 0 ? (
                        produtosFiltrados.map((item: Product) => (
                            <ItemProduct key={item.id} product={item} />
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum produto encontrado.</Text>
                    )}
                </View>
            </ScrollView>

            <PaginationControls
                pageIndex={pageIndex}
                totalPages={totalPages}
                onNext={handleNextPage}
                onPrev={handlePrevPage}
            />

            <NavigationBar initialTab="loja" />
        </SafeAreaView>
    );
};

type ItemProductProps = {
    product: Product;
};

export const ItemProduct = ({ product }: ItemProductProps) => {
    const { navigate } = useNavigation<NavigationProps>();

    const productId = product.id ?? "";

    const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price);

    return (
        <TouchableOpacity style={stylesItem.card} onPress={()=> navigate("ViewProduct",{product})}>
            <View style={stylesItem.info}>
                <ItemText label="Nome do produto" value={product.name} />
                <ItemText
                    label="Categorias"
                    value={product.categories.length > 0 ? product.categories.map(cat => cat.name).join(', ') : 'Sem categorias'}
                />
                <ItemText label="Valor" value={precoFormatado} />
                <ItemImage label="Imagem" imagem={product.pathImage} />
            </View>

            <View style={stylesItem.actions}>
                <ItemButton
                    source={require('../../../assets/images/configuracao.png')}
                    onPress={() => navigate('ManageProduct', { id: productId })}
                />
            </View>
        </TouchableOpacity>
    );
};
