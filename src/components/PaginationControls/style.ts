import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        backgroundColor: 'transparent'
    },

    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    button: {
        borderRadius: 35,
        width: '35%',
        height: 30,
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        flexDirection: 'row',
    },

    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: '#fff'
    },

    text: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 0.5,
        textAlign: 'center'
    },

});
