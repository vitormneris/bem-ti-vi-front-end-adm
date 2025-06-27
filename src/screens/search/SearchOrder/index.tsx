import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View, Pressable, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '../../../components/NavigationBar';
import { PaginationControls } from '../../../components/PaginationControls';

import { search } from '../../../api/order/search/search';
import { Error,Order,OrderPages } from '../../../utils/Types';

import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';

import { NavigationProps } from '../../../routes/AppRoute';

import { styles } from './style';
import { ErrorModal } from '../../../components/ErrorModal';

export function SearchOrder() {
    const { navigate } = useNavigation<NavigationProps>();
    
    const today = new Date();
    const oneMonthAfter = new Date();
    oneMonthAfter.setMonth(today.getMonth() + 1);

    const [momentStart, setMomentStart] = useState<Date>(today);
    const [momentEnd, setMomentEnd] = useState<Date>(oneMonthAfter);
    const [orders, setOrders] = useState<Order[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    useValidateToken();

    hardwareBackPress(navigate, "Home");

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatDateTime = (date: Date) => {
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPageIndex(0);
        }, 600);

        return () => clearTimeout(timeout);
    }, [momentStart, momentEnd]);

    useEffect(() => {
        async function loadOrders() {
            setLoading(true);
            try {
                const start = formatDate(momentStart);
                const end = formatDate(momentEnd);
                const data: OrderPages | Error = await search(start, end, pageIndex);

                if ('orders' in data && 'totalPages' in data) {
                    setOrders(data.orders);
                    setTotalPages(data.totalPages);
                    setError('');
                    setFields([]);
                } else {
                    setOrders([]);
                    setError(data.message || 'Erro desconhecido.');
                    setFields(
                    Array.isArray(data.errorFields) 
                    ? data.errorFields.map(field => field.description) 
                    : []
                );
                    setErrorModalVisible(true);
                }
            } catch {
                setOrders([]);
                setError('Não foi possível carregar os pedidos. Verifique sua conexão.');
            } finally {
                setLoading(false);
            }
        }
        loadOrders();
    }, [pageIndex, momentStart, momentEnd]);

    const handleStartChange = (event: any, selectedDate?: Date) => {
        setShowStartPicker(false);
        if (selectedDate) setMomentStart(selectedDate);
    };

    const handleEndChange = (event: any, selectedDate?: Date) => {
        setShowEndPicker(false);
        if (selectedDate) setMomentEnd(selectedDate);
    };

    const handleNextPage = () => {
        if (pageIndex + 1 < totalPages) setPageIndex(p => p + 1);
    };

    const handlePrevPage = () => {
        if (pageIndex > 0) setPageIndex(p => p - 1);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Data Inicial</Text>
                    <Pressable onPress={() => setShowStartPicker(true)} style={styles.inputField}>
                        <Text>{formatDate(momentStart)}</Text>
                    </Pressable>
                    {showStartPicker && (
                        <DateTimePicker
                            value={momentStart}
                            mode="date"
                            display="default"
                            onChange={handleStartChange}
                        />
                    )}
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Data Final</Text>
                    <Pressable onPress={() => setShowEndPicker(true)} style={styles.inputField}>
                        <Text>{formatDate(momentEnd)}</Text>
                    </Pressable>
                    {showEndPicker && (
                        <DateTimePicker
                            value={momentEnd}
                            mode="date"
                            display="default"
                            onChange={handleEndChange}
                        />
                    )}
                </View>

                <View style={styles.itemContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#256489" style={{ marginTop: 20 }} />
                    ) : orders.length > 0 ? (
                        
                        orders.map(order => (
                            <View key={order.id} style={styles.card}>
                                <Text style={styles.cardTitle}>Cliente: {order.customer.name}</Text>
                                <Text style={styles.cardSubtitle}>Email: {order.customer.email}</Text>
                                <Text style={styles.cardSubtitle}>Data/Hora: {formatDateTime(new Date(order.moment))}</Text>
                                <Text style={styles.cardSubtitle}>Preço Total: R$ {order.totalPrice.toFixed(2)}</Text>
                                <Text style={styles.cardSubtitle}>Status de Pagamento: {order.paymentStatus}</Text>

                                <Text style={styles.cardSubtitle}>Itens do Pedido:</Text>
                                {Array.isArray(order.orderItems) && order.orderItems.length > 0 ? (
                                    order.orderItems.map(item => (
                                        <View key={item.id} style={{ marginLeft: 10, marginBottom: 5 }}>
                                            <Text style={styles.cardText}>Produto: {item.product.name}</Text>
                                            <Text style={styles.cardText}>Quantidade: {item.quantity}</Text>
                                            <Text style={styles.cardText}>Preço Unitário: R$ {item.price.toFixed(2)}</Text>
                                            <Text style={styles.cardText}>Método de pagamento: {order.methodPaymentByPix ? 'Pix' : 'Dinheiro'}</Text>
                                            <Text style={styles.cardText}>Entrega: {order.deliverToAddress ? 'Entregar no endereço' : 'Retirar no local'}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.cardText}>Nenhum item.</Text>
                                )}
                                <TouchableOpacity
                                    onPress={() => navigate('UpdatePaymentStatus', {item: order, type: 'order' })}
                                    style={styles.updateButton}
                                >
                                <Text style={styles.updateButtonText}>Atualizar status do pagamento</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum pedido encontrado.</Text>
                    )}
                </View>

                <ErrorModal
                    visible={errorModalVisible}
                    error={error}
                    fields={fields}
                    onClose={() => setErrorModalVisible(false)}
                />
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
}
