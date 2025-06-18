import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View, Pressable, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '../../../components/NavigationBar';
import { PaginationControls } from '../../../components/PaginationControls';

import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';
import { Order, OrderPages, search } from '../../../api/order/search/search';
import { Error } from '../../../api/product/update/update';

import { styles } from './style';

export function SearchOrder() {
    const { navigate } = useNavigation();

    const [orders, setOrders] = useState<Order[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [momentStart, setMomentStart] = useState<Date>(new Date());
    const [momentEnd, setMomentEnd] = useState<Date>(new Date());

    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);

    useValidateToken();

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        async function loadOrders() {
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
                    setError(data.message || "Erro desconhecido.");
                    setFields(data.errorFields?.map(field => field.description) || []);
                }
            } catch (error) {
                setError('Não foi possível carregar os pedidos. Verifique sua conexão.');
            }
        }

        loadOrders();
    }, [pageIndex, momentStart, momentEnd]);

    const handleStartChange = (event: any, selectedDate?: Date) => {
        setShowStartPicker(false);
        if (selectedDate) {
            setMomentStart(selectedDate);
        }
    };

    const handleEndChange = (event: any, selectedDate?: Date) => {
        setShowEndPicker(false);
        if (selectedDate) {
            setMomentEnd(selectedDate);
        }
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
                    {orders.map(order => (
                        <View key={order.id} style={styles.card}>
                            <Text style={styles.cardTitle}>Cliente: {order.customer.name}</Text>
                            <Text style={styles.cardSubtitle}>Email: {order.customer.email}</Text>
                            <Text style={styles.cardSubtitle}>Data/Hora: {formatDateTime(new Date(order.dateTime))}</Text>
                            <Text style={styles.cardSubtitle}>Preço Total: R$ {order.totalPrice.toFixed(2)}</Text>
                            <Text style={styles.cardSubtitle}>Status de Pagamento: {order.paymentStatus}</Text>

                            <Text style={styles.cardSubtitle}>Itens do Pedido:</Text>
                            {Array.isArray(order.orderItems) ? (
                                order.orderItems.map(item => (
                                    <View key={item.id} style={{ marginLeft: 10, marginBottom: 5 }}>
                                        <Text style={styles.cardText}>Produto: {item.product.name}</Text>
                                        <Text style={styles.cardText}>Quantidade: {item.quantity}</Text>
                                        <Text style={styles.cardText}>Preço Unitário: R$ {item.price.toFixed(2)}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.cardText}>Nenhum item.</Text>
                            )}
                        </View>
                    ))}
                </View>

                <PaginationControls
                    pageIndex={pageIndex}
                    totalPages={totalPages}
                    onNext={() => setPageIndex(prev => Math.min(prev + 1, totalPages - 1))}
                    onPrev={() => setPageIndex(prev => Math.max(prev - 1, 0))}
                />

                {error ? (
                    <View style={{ marginVertical: 10, alignSelf: 'center' }}>
                        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
                        {fields.map((field, index) => (
                            <Text key={index} style={{ color: 'red', textAlign: 'center' }}>• {field}</Text>
                        ))}
                    </View>
                ) : null}
            </ScrollView>

            <NavigationBar initialTab='home' />
        </SafeAreaView>
    );
}

const formatDateTime = (date: Date) => {
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
