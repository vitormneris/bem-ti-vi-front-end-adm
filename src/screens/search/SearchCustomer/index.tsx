import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, SafeAreaView, View, Text, ActivityIndicator, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '../../../components/NavigationBar';
import { SearchInput } from '../../../components/SearchInput';
import { PaginationControls } from '../../../components/PaginationControls';

import { NavigationProps } from '../../../routes/AppRoute';

import { Customer, CustomerPages, search } from '../../../api/customer/search/search';

import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';

import { stylesItem } from '../style';
import { styles } from './style';

export const SearchCustomer = () => {
    const { navigate } = useNavigation<NavigationProps>();

    const [searchText, setSearchText] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [clientes, setClientes] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useValidateToken();
    hardwareBackPress(navigate, "Home");

    const carregarClientes = useCallback(async (textoBusca: string, pagina: number) => {
        setLoading(true);
        setError('');
        try {
            const dados: CustomerPages | undefined = await search(textoBusca, pagina);
            if (dados && dados.customers.length > 0) {
                setClientes(dados.customers);
                setTotalPages(dados.totalPages);
            } else {
                setClientes([]);
                setTotalPages(1);
            }
        } catch {
            setClientes([]);
            setTotalPages(1);
            setError('Erro ao carregar clientes. Verifique sua conexão.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPageIndex(0);
            carregarClientes(searchText, 0);
        }, 600);

        return () => clearTimeout(timer);
    }, [searchText, carregarClientes]);

    useEffect(() => {
        if (pageIndex !== 0) {
            carregarClientes(searchText, pageIndex);
        }
    }, [pageIndex, searchText, carregarClientes]);

    const handleNextPage = () => {
        if (pageIndex + 1 < totalPages) setPageIndex(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (pageIndex > 0) setPageIndex(prev => prev - 1);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollview}>
                <SearchInput
                    placeholder="Buscar cliente..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                {error ? (
                    <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10 }}>{error}</Text>
                ) : null}

                <View style={stylesItem.itemContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#256489" style={{ marginTop: 20 }} />
                    ) : clientes.length > 0 ? (
                        clientes.map((cliente: Customer) => (
                            <ItemCustomer key={cliente.id} customer={cliente} />
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum cliente encontrado.</Text>
                    )}
                </View>
            </ScrollView>

            <PaginationControls
                pageIndex={pageIndex}
                totalPages={totalPages}
                onNext={handleNextPage}
                onPrev={handlePrevPage}
            />

            <NavigationBar initialTab="home" />
        </SafeAreaView>
    );
};

type ItemCustomerProps = {
    customer: Customer;
};

export const ItemCustomer = ({ customer }: ItemCustomerProps) => {
    return (
        <View style={stylesItem.card}>
            <View style={stylesItem.info}>
                {customer.pathImage ? (
                    <Image source={{ uri: customer.pathImage }} style={styles.image} />
                ) : (
                    <View style={[styles.image, {backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center'}]}>
                        <Text>Sem foto</Text>
                    </View>
                )}

                <Text style={styles.label}><Text style={{ fontWeight: 'bold' }}>Nome:</Text> {customer.name}</Text>
                <Text style={styles.label}><Text style={{ fontWeight: 'bold' }}>Email:</Text> {customer.email}</Text>
                <Text style={styles.label}><Text style={{ fontWeight: 'bold' }}>Pets:</Text> {customer.pets.length}</Text>
                <Text style={styles.label}><Text style={{ fontWeight: 'bold' }}>Agendamentos:</Text> {customer.appointments.length}</Text>
                <Text style={styles.label}><Text style={{ fontWeight: 'bold' }}>Pedidos:</Text> {customer.orders.length}</Text>
            </View>
        </View>
    );
};
