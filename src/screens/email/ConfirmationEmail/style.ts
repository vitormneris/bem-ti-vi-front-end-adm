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
        marginBottom: 20
    },
    label: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#333',
        marginBottom: 8
    },
    input: {
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 12,
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#EEE'
    },
    imagePicker: {
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEE'
    },
    imagePickerText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: '#666'
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 8
    },

    confirmText: {
        color: 'blue',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 8,
    },
});