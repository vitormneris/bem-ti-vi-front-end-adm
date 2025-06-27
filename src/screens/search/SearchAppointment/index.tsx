import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View, Pressable, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { NavigationBar } from '../../../components/NavigationBar';
import { PaginationControls } from '../../../components/PaginationControls';

import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';
import { search } from '../../../api/appointment/search/search';
import { Error, Appointment, AppointmentPages } from '../../../utils/Types';

import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../routes/AppRoute';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../../components/ErrorModal';

export function SearchAppointment() {
    const { navigate } = useNavigation<NavigationProps>();

    const today = new Date();
    const oneMonthAfter = new Date();
    oneMonthAfter.setMonth(today.getMonth() + 1);

    const [momentStart, setMomentStart] = useState<Date>(today);
    const [momentEnd, setMomentEnd] = useState<Date>(oneMonthAfter);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
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
        const debounceTimeout = setTimeout(() => {
            setPageIndex(0);
        }, 600);
        return () => clearTimeout(debounceTimeout);
    }, [momentStart, momentEnd]);

    useEffect(() => {
        async function loadAppointments() {
            setLoading(true);
            try {
                const start = formatDate(momentStart);
                const end = formatDate(momentEnd);
                const data: AppointmentPages | Error = await search(start, end, pageIndex);

                if ('appointments' in data && 'totalPages' in data) {
                    setAppointments(data.appointments);
                    setTotalPages(data.totalPages);
                    setError('');
                    setFields([]);
                } else {
                    setAppointments([]);
                    setError(data.message || 'Erro desconhecido.');
                    setFields(
                    Array.isArray(data.errorFields) 
                    ? data.errorFields.map(field => field.description) 
                    : []
                );
                    setErrorModalVisible(true);
                }
            } catch {
                setAppointments([]);
                setError('Não foi possível carregar os agendamentos. Verifique sua conexão.');
                setErrorModalVisible(true);
            } finally {
                setLoading(false);
            }
        }
        loadAppointments();
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
        if (pageIndex + 1 < totalPages) setPageIndex(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (pageIndex > 0) setPageIndex(prev => prev - 1);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                {/* Data Inicial */}
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

                {/* Data Final */}
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
                    ) : appointments.length > 0 ? (
                        appointments.map(appointment => (
                            <View key={appointment.id} style={styles.card}>
                                <Text style={styles.cardTitle}>Cliente: {appointment.customer.name}</Text>
                                <Text style={styles.cardSubtitle}>Email: {appointment.customer.email}</Text>
                                <Text style={styles.cardSubtitle}>Serviço: {appointment.service.name}</Text>
                                <Text style={styles.cardSubtitle}>Descrição: {appointment.service.description}</Text>
                                <Text style={styles.cardSubtitle}>Data/Hora: {formatDateTime(new Date(appointment.dateTime))}</Text>
                                <Text style={styles.cardSubtitle}>Preço: R$ {appointment.price.toFixed(2)}</Text>
                                <Text style={styles.cardSubtitle}>Status de Pagamento: {appointment.paymentStatus}</Text>
                                <Text style={styles.cardSubtitle}>Método de pagamento: {appointment.methodPaymentByPix ? 'Pix' : 'Dinheiro'}</Text>
                                <TouchableOpacity
                                    onPress={() => navigate('UpdatePaymentStatus', {item: appointment, type: 'appointment' })}
                                    style={styles.updateButton}
                                >
                                <Text style={styles.updateButtonText}>Atualizar status do pagamento</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum agendamento encontrado.</Text>
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
