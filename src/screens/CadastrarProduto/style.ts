import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerPrincipal: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 30,
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
    fontFamily: 'Montserrat-Black',
    fontSize: 18,
    color: '#333',
    marginRight: 8,
  },
  iconeMenu: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  subtituloContainer: {
    paddingTop: 35,
    paddingBottom: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  linhaDivisoria: {
    height: 3,
    backgroundColor: '#000',
    width: '65%',
    marginBottom: 10,  // Reduzido (era 20)
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginTop: 14,  // Reduzido (era 20)
    marginBottom: 6,
  },
  label: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: 'rgba(236, 234, 234, 0.4)',
    fontFamily: 'Montserrat-Medium',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: 'rgba(236, 234, 234, 0.4)',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    height: 55,
    width: '100%',
    color: '#333',
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  pickerText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#333',
    paddingLeft: 12,
  },
  pickerPlaceholder: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#999',
  },
  pickerItem: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  fileInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(236, 234, 234, 0.4)',
    justifyContent: 'center',
  },
  fileInputWithImage: {
    borderColor: '#6200EE',
    backgroundColor: 'rgba(243, 237, 252, 0.7)',
  },
  fileInputText: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  fileInputTextWithImage: {
    color: '#6200EE',
    fontFamily: 'Montserrat-Medium',
  },
  descricaoInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: 'rgba(236, 234, 234, 0.4)',
    height: 150,
    textAlignVertical: 'top',
    fontFamily: 'Montserrat-Medium',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  cadastrarButton: {
    backgroundColor: '#006516',
    borderRadius: 35,
    width: 205,
    height: 55,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cadastrarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
});

export default styles;