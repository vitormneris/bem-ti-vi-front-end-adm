import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, } from 'react-native';

import { NavigationBar } from '../../components/NavigationBar';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';
import { ListService } from '../../components/ListItems/ListService';

import {styles} from './style';

type ServicoType = {
    id: number;
    nome: string;
    preco: string;
    imagem: any;
};

export const SearchService = () => {
    const [searchText, setSearchText] = useState('');
    const [servicos, setServicos] = useState<ServicoType[]>([]);

    const filteredServicos = servicos.filter(servico =>
        servico.nome.toLowerCase().includes(searchText.toLowerCase())
    );
    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await fetch('http://URL:8080/service/paginacao?isActive=true&pageSize=3&page=0');
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }

                const data = await response.json();
                const servicosFormatados = data.content.map((item: any) => ({
                    id: item.id,
                    nome: item.name || 'Nome não disponível',
                    preco: item.price ? `R$${item.price.toFixed(2).replace('.', ',')}` : 'R$0,00',
                    imagem: item.pathImage || null,
                }));
                setServicos(servicosFormatados)
            } catch (err) {
                console.error('Erro ao buscar serviços:', err);
            }
        }
        fetchServicos()
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
                    placeholder="Buscar serviço..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <ListService filteredItems={filteredServicos} />
            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
};
