import { StatusBar } from 'expo-status-bar';
import { 
  useFonts, 
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_900Black // Adicione esta importação
} from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import GerenciarServico from './src/screens/GerenciarServico';
import GerenciarProduto from './src/screens/GerenciarProduto';
import GerenciarCategoria from './src/screens/GerenciarCategoria';
import TelaLogin from './src/screens/TelaLogin';
import ListarProduto from './src/screens/ListarProduto';

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
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <TelaLogin />
      {/* <GerenciarProduto />  */}
      {/* <GerenciarServico /> */}
      {/* <GerenciarCategoria />  */}
      <StatusBar style="auto" />
    </View>
  );
}