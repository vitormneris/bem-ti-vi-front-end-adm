import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';

import { NavigationBar } from '../../components/NavigationBar';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';
import { ListProduct } from '../../components/ListItems/ListProduct';

import { styles } from './style';

type ProdutoType = {
    id: number;
    nome: string;
    categoria: string;
    valor: string;
};

export const SearchProduct = () => {
    const [searchText, setSearchText] = useState('');
    const [produtos, setProdutos] = useState<ProdutoType[]>([]);

    const filteredProdutos = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        produto.categoria.toLowerCase().includes(searchText.toLowerCase())
    );
    
    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://URL:8080/produto/paginacao?isActive=true&pageSize=5&page=0');
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }

                const data = await response.json();
                const produtosFormatados = data.content.map((item: any) => ({
                    id: item.id,
                    nome: item.name || 'Nome não disponível',
                    categoria: item.categories?.[0]?.name || 'Sem categoria',
                    valor: item.price ? `R$${item.price.toFixed(2).replace('.', ',')}` : 'R$0,00',
                }));
                setProdutos(produtosFormatados)
            } catch (err) {
                console.error('Erro ao buscar produtos:', err);
            }
        }
        fetchProdutos()
    })

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                <Button
                    icon={require('../../assets/images/add.png')} 
                    text="CADASTRAR" 
                    color="#256489" 
                    action={() => {}} 
                />

                <SearchInput
                    placeholder="Buscar produto..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <ListProduct filteredItems={filteredProdutos} />
            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
};