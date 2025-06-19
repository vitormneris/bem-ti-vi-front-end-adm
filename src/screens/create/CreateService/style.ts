import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },

    buttonsContainer: {
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginVertical: 20,
    },

    subcontainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

});