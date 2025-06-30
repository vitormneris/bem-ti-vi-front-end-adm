import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    sidebar: {
        width: 120,
        borderRightWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
    },
    sidebarHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginLeft: 8,
        color: '#333',
    },
    clientItem: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderRadius: 4,
        marginBottom: 4,
        backgroundColor: '#eee',
    },
    clientItemSelected: {
        backgroundColor: '#a0c4ff',
    },
    clientText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#333',
    },
    chatArea: {
        flex: 1,
        paddingHorizontal: 10,
    },
    messageInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingTop: 10,
    },
    messageInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
    },
    sendButton: {
        padding: 8,
    },
    message: {
        borderRadius: 8,
        marginVertical: 4,
        padding: 8,
        maxWidth: '70%',
    },
    name: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        color: '#333',
    },
    content: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: '#333',
        marginVertical: 4,
    },
    moment: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
    emptyText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: '#666',
        marginTop: 20,
        textAlign: 'center',
    }
});