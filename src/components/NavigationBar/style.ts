import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70
    },

    navIcon: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
        zIndex: 1
    },

    navLabel: {
        fontSize: 12,
        color: '#333',
        fontFamily: 'Montserrat-Medium',
        marginTop: 2
    },

    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 60,
        padding: 5,
        position: 'relative'
    },

    navIconContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36
    },

    activeIndicator: {
        position: 'absolute',
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#D3E5F5',
        zIndex: 0
    },
})
