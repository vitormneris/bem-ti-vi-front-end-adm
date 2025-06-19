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

    subcontainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

});