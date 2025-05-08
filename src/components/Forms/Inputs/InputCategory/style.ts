import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    formGroup: {
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 8
    },

    label: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        color: '#333',
        marginBottom: 6,
        marginLeft: 4
    },

    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        backgroundColor: 'rgba(236, 234, 234, 0.4)',
        overflow: 'hidden',
        justifyContent: 'center',
        marginTop: 4
    },

    picker: {
        height: 55,
        width: '100%',
        color: '#333',
        paddingVertical: 10,
        backgroundColor: 'transparent'
    },
    
    pickerPlaceholder: {
        position: 'absolute',
        left: 16,
        zIndex: 1,
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#999',
        top: 16
    },

})
