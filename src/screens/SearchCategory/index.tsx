import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';

import { NavigationBar } from '../../components/NavigationBar';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';
import { ListCategory } from '../../components/ListItems/ListCategory';

import { styles } from './style';

type CategoriaType = {
    id: number;
    nome: string;
    imagem: any;
};

export const SearchCategory = () => {
    const [searchText, setSearchText] = useState('');
    const [categorias, setCategorias] = useState<CategoriaType[]>([]);

    const filteredCategorias = categorias.filter(categoria =>
        categoria.nome.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://URL:8080/categoria/paginacao?isActive=true&pageSize=3&page=0');
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }

                const data = await response.json();
                const categoriasFormatadas = data.content.map((item: any) => ({
                    id: item.id,
                    nome: item.name || 'Nome não disponível',
                    imagem: item.pathImage || null,
                }));
                setCategorias(categoriasFormatadas)
            } catch (err) {
                console.error('Erro ao buscar categorias:', err);
            }
        }
        fetchCategorias()
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
                    placeholder="Buscar categoria..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                {/* Lista de Categorias */}
                <ListCategory filteredItems={filteredCategorias} />

            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
};
