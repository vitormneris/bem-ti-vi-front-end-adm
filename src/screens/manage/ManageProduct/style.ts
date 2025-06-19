import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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
    },

});