import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F0FE',
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        paddingTop: 10,
    },

    logoContainer: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 10,
    },

    logo: {
        width: 500,
        height: 300,
    },

    logoSubText: {
        fontSize: 22,
        fontFamily: 'Montserrat-Black',
        color: '#1B3B6F', // Azul mais escuro, mais corporativo
        marginBottom: 2,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D6E4F0', // Cinza-azulado
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'rgba(27, 59, 111, 0.3)', // Azul escuro transparente
        height: 48,
    },

    inputIcon: {
        width: 28,
        height: 28,
        marginRight: 10,
        opacity: 0.7,
    },

    input: {
        flex: 1,
        fontSize: 15,
        color: '#333',
        fontFamily: 'Montserrat-Medium',
        paddingVertical: 0,
    },

    loginButton: {
        backgroundColor: '#1B3B6F', // Azul escuro forte
        borderRadius: 30,
        padding: 12,
        width: 250,
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignSelf: 'center',
        marginBottom: 8,
    },

    loginButtonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 0.5,
        textAlign: 'center',
        width: '100%',
    },

    error: {
        textAlign: 'center',
        fontSize: 16,
        color: '#B00020', // Vermelho mais discreto
        marginVertical: 10,
    }
});
