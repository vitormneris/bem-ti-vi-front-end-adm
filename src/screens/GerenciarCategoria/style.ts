import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollView: {
    flex: 1,
    marginBottom: 70
  },
  scrollContent: {
    paddingBottom: 40
  },
  formGroup: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8
  },
  label: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    marginLeft: 4
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    backgroundColor: 'rgba(236, 234, 234, 0.4)',
    fontFamily: 'Montserrat-Medium',
    marginTop: 4
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 14,
    backgroundColor: 'rgba(236, 234, 234, 0.4)',
    justifyContent: 'center',
    marginTop: 4
  },
  imagePickerActive: {
    borderColor: '#6200EE',
    backgroundColor: 'rgba(243, 237, 252, 0.7)'
  },
  imagePickerText: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 2
  },
  imagePickerTextActive: {
    color: '#6200EE',
    fontFamily: 'Montserrat-Medium'
  },
  imagePreviewContainer: {
    marginTop: 16,
    alignItems: 'center'
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    resizeMode: 'cover'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 32,
    marginBottom: 30,
  },
});
