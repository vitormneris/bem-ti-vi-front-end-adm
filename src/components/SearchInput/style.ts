import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 45,
        marginHorizontal: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },

    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
        tintColor: '#666',
    },

    searchInput: {
        flex: 1,
        height: '100%',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#333',
        paddingVertical: 0,
        paddingTop: 0,
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
})