


import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F9F9F9'
  },
  container: {
    paddingBottom: 100,
    paddingTop: 20
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 90,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#E8F4FD'
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  sectionHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 16,
    color: '#2D3748',
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 8
  },
  fieldContainer: {
    padding: 16
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  label: {
    fontSize: 15,
    color: '#718096',
    fontFamily: 'Montserrat-Medium',
    flex: 1
  },
  value: {
    fontSize: 14,
    color: '#2D3748',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'right',
    flex: 1
  },
  description: {
    fontSize: 14,
    color: '#2D3748',
    fontFamily: 'Montserrat-Regular',
    marginTop: 4,
    lineHeight: 20
  }
});
