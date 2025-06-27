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
  profileSection: {
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 16
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 90,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E8F4FD'
  },
  clientName: {
    fontSize: 20,
    color: '#2D3748',
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 5,
    textAlign: 'center'
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
    borderBottomColor: '#EDF2F7'
  },
  sectionTitle: {
    fontSize: 16,
    color: '#2D3748',
    fontFamily: 'Montserrat-SemiBold'
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
    fontSize: 13,
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
  descriptionContainer: {
    marginBottom: 16
  },
  description: {
    fontSize: 14,
    color: '#2D3748',
    fontFamily: 'Montserrat-Regular',
    marginTop: 4,
    lineHeight: 20
  },
  navWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center'
  }
});
