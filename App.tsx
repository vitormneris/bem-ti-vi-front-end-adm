import React, { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AppRoute from './src/routes/AppRoute';

import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_900Black 
} from '@expo-google-fonts/montserrat';

export default function App() {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': Montserrat_400Regular,
        'Montserrat-Medium': Montserrat_500Medium,
        'Montserrat-SemiBold': Montserrat_600SemiBold,
        'Montserrat-Bold': Montserrat_700Bold,
        'Montserrat-Black': Montserrat_900Black
    });

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
            } catch (e) {
                console.warn(e);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <AppRoute />
                </SafeAreaView>
            </SafeAreaProvider>

            <StatusBar style="auto" />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})