import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, SafeAreaView, View, Text, ActivityIndicator, BackHandler } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '../../../components/NavigationBar';
import { SearchInput } from '../../../components/SearchInput';
import { Button } from '../../../components/Button';
import { PaginationControls } from '../../../components/PaginationControls';
import { ItemText } from '../../../components/Items/ItemText/ItemText';
import { ItemImage } from '../../../components/Items/ItemImage/ItemImage';
import { ItemButton } from '../../../components/Items/ItemButton/ItemButton';

import { NavigationProps } from '../../../routes/AppRoute';

import { Service } from '../../../api/service/create/create';
import { search, ServicePages } from '../../../api/service/search/search';

import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';

import { styles } from './style';
import { stylesItem } from '../style';
import { ButtonLarge } from '../../../components/ButtonLarge';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../../components/ErrorModal';

export const SearchService = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [searchText, setSearchText] = useState<string>('');
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [servicos, setServicos] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    useValidateToken();

    hardwareBackPress(navigate, "Home");

    const carregarServicos = useCallback(async (textoBusca: string, pagina: number) => {
        setLoading(true);
        setError('');
        try {
            const dados: ServicePages | undefined = await search(textoBusca, pagina);
            if (dados) {
                setServicos(dados.services);
                setTotalPages(dados.totalPages);
            } else {
                setServicos([]);
                setTotalPages(1);
                setError('Nenhum serviço encontrado.');
                setErrorModalVisible(true);
            }
        } catch {
            setServicos([]);
            setTotalPages(1);
            setError('Erro ao carregar serviços. Verifique sua conexão.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Resetar página para 0 ao mudar o texto de busca
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setPageIndex(0);
            carregarServicos(searchText, 0);
        }, 600);

        return () => clearTimeout(delayDebounce);
    }, [searchText, carregarServicos]);

    // Carregar a página atual sempre que o pageIndex mudar
    useEffect(() => {
        carregarServicos(searchText, pageIndex);
    }, [pageIndex, searchText, carregarServicos]);

    const filteredServicos = servicos.filter(servico =>
        servico.name.toLowerCase().includes(searchText.toLowerCase())
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
                    action={() => navigate('CreateService')}
                />

                <SearchInput
                    placeholder="Buscar serviço..."
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
                    ) : filteredServicos.length > 0 ? (
                        filteredServicos.map((item: Service) => (
                            <ItemService key={item.id} service={item} />
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum serviço encontrado.</Text>
                    )}
                </View>
            </ScrollView>

            <PaginationControls
                pageIndex={pageIndex}
                totalPages={totalPages}
                onNext={handleNextPage}
                onPrev={handlePrevPage}
            />

            <NavigationBar initialTab='servicos' />
        </SafeAreaView>
    );
};

type ItemServiceProps = {
    service: Service;
};

export const ItemService = ({ service }: ItemServiceProps) => {
    const { navigate } = useNavigation<NavigationProps>();

    const serviceId: string = service.id ?? '';

    // Formata preço para real brasileiro
    const precoFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(service.price);

    return (
        <View style={stylesItem.card}>
            <View style={stylesItem.info}>
                <ItemText label="Nome do serviço" value={service.name} />
                <ItemText label="Preço" value={precoFormatado} />
                <ItemImage label="Imagem" imagem={service.pathImage} />
            </View>

            <View style={stylesItem.actions}>
                <ItemButton
                    source={require('../../../assets/images/configuracao.png')}
                    onPress={() => navigate('ManageService', { id: serviceId })}
                />
            </View>
        </View>
    );
};
