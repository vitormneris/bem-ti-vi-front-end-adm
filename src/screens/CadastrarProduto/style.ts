import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerPrincipal: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: '#EADDFF',
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  botaoEsquerda: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  iconeVoltar: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  tituloContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  iconeMenu: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  subtituloContainer: {
    paddingTop: 26,
    paddingBottom: 4,
    alignItems: 'center',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    textAlign: 'center',
  },
  linhaDivisoria: {
    height: 3,
    backgroundColor: '#000',
    width: '55%',
    marginTop: 0,
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff', // Fundo branco
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#fff', // Fundo branco
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
});

export default styles;