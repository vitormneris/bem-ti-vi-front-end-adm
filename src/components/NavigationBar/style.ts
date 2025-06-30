import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        height: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 4,
    },
    navIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 30,
        marginBottom: 2,
        position: 'relative'
    },
    navIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    navLabel: {
        fontSize: 10,
        fontFamily: 'Montserrat-Medium',
        marginTop: 2,
        textAlign: 'center'
    },
    activeIndicator: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(37, 100, 137, 0.1)', // #256489 with 10% opacity
        top: -5,
    }
});