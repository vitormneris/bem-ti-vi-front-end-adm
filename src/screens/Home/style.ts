import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    screen: {
        marginTop: 15,
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    welcomeTitle: {
        marginTop: 20,
        marginBottom: 30,
    },
    buttonsContainer: {
        alignItems: 'center',
    },
    button: {
        borderRadius: 12,
        padding: 20,
        marginVertical: 12,
        width: '100%',
        height: 90,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#256489',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Montserrat-Bold',
        color: '#333',
    }
});