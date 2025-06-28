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
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
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
        fontSize: 14,
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
    },

    message: {
        borderRadius: 8,
        marginVertical: 4,
        padding: 8,
        maxWidth: '70%',
    },
    name: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14
    },
    content: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16
    },
    moment: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
    }
});