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
        paddingBottom: 40
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 32,
        marginBottom: 30,
    },

    error: {
        textAlign: 'center',
        fontSize: 20,
        color: '#FF0000',
        marginVertical: 10
    },

    field: {
        textAlign: 'center',
        fontSize: 18,
        color: '#FF0000',
        marginVertical: 10
    }

});