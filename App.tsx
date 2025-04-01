import { StatusBar } from 'expo-status-bar';
import CadastrarProduto from './src/screens/CadastrarProduto'; // Importação sem chaves

export default function App() {
  return (
    <>
      <CadastrarProduto />
      <StatusBar style="auto" />
    </>
  );
}