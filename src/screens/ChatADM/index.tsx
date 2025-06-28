import React, { useEffect, useRef, useState } from 'react';
import { Button, TextInput, View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { GLOBAL_VAR } from '../../api/config/globalVar';
import { styles } from './style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps } from '../../routes/AppRoute';
import { ChatMessage, UserChat } from '../../utils/Types';
import { loadHistoryChat } from '../../api/chat/loadHistoryChat';
import { getIds } from '../../api/chat/getIds';
import hardwareBackPress from '../../utils/hardwareBackPress/hardwareBackPress';

export default function ChatADM() {
    const { navigate } = useNavigation<NavigationProps>();
    const route = useRoute();
    const { name: nameAdm } = route.params as { name: string };

    const [chatMessagesMap, setChatMessagesMap] = useState<{ [userId: string]: ChatMessage[] }>({});
    const [selecteduserId, setSelecteduserId] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const clientRef = useRef<Client | null>(null);
    const fetchedClientsRef = useRef<Set<string>>(new Set());

    const [clientsInfo, setClientsInfo] = useState<UserChat[]>([]);

    hardwareBackPress(navigate, "ShowProfile");

    const fetchChatHistory = async (userId: string) => {
        try {
            const data = await loadHistoryChat(userId);

            if ('code' in data) return;

            setChatMessagesMap((prev) => ({
                ...prev,
                [userId]: data,
            }));
        } catch (error) {
            console.error(`Erro ao buscar histórico do cliente ${userId}:`, error);
            Alert.alert('Erro', `Não foi possível carregar o histórico do cliente ${userId}.`);
        }
    };

    useEffect(() => {
        const loadInitialChats = async () => {
            try {
                const users = await getIds();
                if ('code' in users) return;

                setClientsInfo(users);

                await Promise.all(users.map(async ({ id }) => {
                    await fetchChatHistory(id);
                    fetchedClientsRef.current.add(id);
                }));

                if (users.length > 0) {
                    setSelecteduserId(users[0].id);
                }
            } catch (error) {
                console.error('Erro ao buscar lista de clientes:', error);
                Alert.alert('Erro', 'Não foi possível carregar os chats existentes.');
            }
        };

        loadInitialChats();
    }, []);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(`${GLOBAL_VAR.BASE_URL}/bemtivi-app-websocket`),
            reconnectDelay: 5000,
            debug: (str) => console.log(str),

            onConnect: () => {
                console.log('✅ Admin conectado ao STOMP');

                clientRef.current?.subscribe('/topic/admin', (message: IMessage) => {
                    try {
                        const body: ChatMessage = JSON.parse(message.body);

                        setChatMessagesMap((prev) => {
                            const prevMessages = prev[body.userId] || [];

                            if (!fetchedClientsRef.current.has(body.userId)) {
                                fetchedClientsRef.current.add(body.userId);
                                fetchChatHistory(body.userId);
                            }

                            return {
                                ...prev,
                                [body.userId]: [...prevMessages, body],
                            };
                        });

                        setClientsInfo((prevClients) => {
                            const exists = prevClients.some((c) => c.id === body.userId);
                            if (!exists) {
                                return [...prevClients, { id: body.userId, name: body.userName }];
                            }
                            return prevClients;
                        });

                        if (!selecteduserId) {
                            setSelecteduserId(body.userId);
                        }
                    } catch (err) {
                        console.error('Erro ao processar mensagem:', err);
                    }
                });
            },

            onStompError: (frame) => {
                console.error('🚨 Erro STOMP:', frame.headers['message']);
                Alert.alert('Erro STOMP', frame.headers['message'] || 'Erro desconhecido');
            },

            onWebSocketError: (event) => {
                console.error('❌ WebSocket error:', event);
                Alert.alert('Erro de WebSocket', 'Não foi possível conectar ao servidor.');
            },

            onWebSocketClose: (event) => {
                console.log('🔌 WebSocket fechado:', event.reason);
            },
        });

        clientRef.current = client;
        client.activate();

        return () => {
            client.deactivate();
        };
    }, []);

    const sendMessage = () => {
        if (!selecteduserId) {
            Alert.alert('Selecione um cliente para enviar mensagem.');
            return;
        }
        if (clientRef.current && message.trim()) {
            const chatMessage: ChatMessage = {
                userId: selecteduserId,
                userName: nameAdm,
                sender: 'ADMINISTRATOR',
                content: message.trim(),
                moment: new Date().toISOString(), 
            };

            clientRef.current.publish({
                destination: '/app/admin-message',
                body: JSON.stringify(chatMessage),
            });

            setChatMessagesMap((prev) => {
                const prevMessages = prev[selecteduserId] || [];
                return {
                    ...prev,
                    [selecteduserId]: [...prevMessages, chatMessage],
                };
            });

            setMessage('');
        } else {
            Alert.alert('Digite uma mensagem.');
        }
    };

    const renderClientItem = ({ item }: { item: UserChat }) => {
        const isSelected = item.id === selecteduserId;

        return (
            <TouchableOpacity onPress={() => setSelecteduserId(item.id)} style={[styles.clientItem, isSelected && styles.clientItemSelected]}>
                <Text style={styles.clientText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderMessage = ({ item }: { item: ChatMessage }) => {
        const isAdmin = item.sender === 'ADMINISTRATOR';
        return (
            <View style={[styles.message, { backgroundColor: isAdmin ? '#D1E7DD' : '#F8D7DA', alignSelf: isAdmin ? 'flex-end' : 'flex-start' }]}>
                <Text style={styles.name}>{item.userName}</Text>
                <Text style={styles.content}>{item.content}</Text>
                {/* ✅ Usando new Date() para garantir formatação correta mesmo se moment for string */}
                <Text style={styles.moment}>
                    {item.moment ? new Date(item.moment).toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.sidebar}>
                <Text style={styles.title}>Clientes</Text>
                <FlatList
                    data={clientsInfo}
                    keyExtractor={(item) => item.id}
                    renderItem={renderClientItem}
                    ListEmptyComponent={<Text>Nenhum cliente conectado</Text>}
                />
            </View>

            <View style={styles.chatArea}>
                <Text style={styles.title}>
                    {selecteduserId
                        ? `Chat com: ${clientsInfo.find(c => c.id === selecteduserId)?.name ?? "Desconhecido"}`
                        : 'Selecione um cliente'}
                </Text>

                {selecteduserId ? (
                    <>
                        <FlatList
                            data={chatMessagesMap[selecteduserId] || []}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderMessage}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            showsVerticalScrollIndicator={false}
                        />

                        <View style={styles.messageInputContainer}>
                            <TextInput
                                placeholder="Digite sua mensagem"
                                value={message}
                                onChangeText={setMessage}
                                style={styles.messageInput}
                            />
                            <Button title="Enviar" onPress={sendMessage} disabled={!message.trim()} />
                        </View>
                    </>
                ) : (
                    <Text style={{ marginTop: 20 }}>Nenhuma conversa selecionada.</Text>
                )}
            </View>
        </View>
    );
}
