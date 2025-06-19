import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-between',
    },

    button: {
        borderRadius: 10,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 3,
        borderBottomWidth: 3,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        width: '90%',
        height: 80,
        backgroundColor: '#FFFFFF',
        elevation: 1,
        justifyContent: 'center',
        borderColor: '#DDD'
    },
    
    buttonText: {
        fontSize: 13,
        fontWeight: '700',
        fontFamily: 'google-sans',
        textAlign: 'center',
        color: '#333'
    }
});