import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({   
    itemContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        marginTop: 10
    },

    card: {
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#EEE'
    },

    info: {
        flex: 1
    },

    label: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        color: '#666',
        marginBottom: 2
    },

    value: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 13,
        color: '#333',
        marginBottom: 10
    },

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
})