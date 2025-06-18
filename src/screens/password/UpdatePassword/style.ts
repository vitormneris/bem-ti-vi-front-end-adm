import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollView: {
        flex: 1,
        marginBottom: 70
    },
    scrollContent: {
        paddingBottom: 40,
        paddingHorizontal: 16
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginVertical: 32,
        gap: 16
    },
    formContainer: {
        marginTop: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C9EBFF',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'rgba(37, 100, 137, 0.3)',
        height: 48,
    },

    label: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#333',
        marginBottom: 8
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#333',
        fontFamily: 'Montserrat-Medium',
        paddingVertical: 0,
    },
    inputIcon: {
        width: 28,
        height: 28,
        marginRight: 10,
        opacity: 0.65,
    },
});