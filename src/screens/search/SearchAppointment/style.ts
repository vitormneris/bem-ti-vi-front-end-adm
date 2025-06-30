import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: '#555',
        fontFamily: 'Montserrat-Bold',
        marginLeft: 5
    },
    inputField: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        fontFamily: 'Montserrat-Medium',
        backgroundColor: '#fff',
    },
    itemContainer: {
        marginTop: 16,
        fontFamily: 'Montserrat-Medium',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        fontFamily: 'Montserrat-Medium',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        fontFamily: 'Montserrat-Medium'
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2,
    },
    errorContainer: {
        backgroundColor: '#ffe5e5',
        padding: 12,
        borderRadius: 8,
        marginVertical: 10,
    },
    errorText: {
        color: '#d00',
        textAlign: 'center',
    },
        updateButton: {
        backgroundColor: '#006516',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    updateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily:"Montserrat"
    },
});
