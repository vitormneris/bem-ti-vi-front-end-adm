import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#256489',
    marginBottom: 20,
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  picker: {
    height: 60,
    paddingHorizontal: 10,
  },
  updateButton: {
    backgroundColor: '#006516',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
});
