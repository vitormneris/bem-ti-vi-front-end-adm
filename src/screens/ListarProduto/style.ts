import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  header: {
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
    elevation: 5
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'Montserrat-Black',
    fontSize: 18,
    color: '#333',
    marginRight: 8
  },
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16
  },
  cadastrarButton: {
    backgroundColor: '#256489',
    borderRadius: 30,
    padding: 16,
    width: 250,
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  cadastrarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 0.5,
    marginLeft: 8
  },
  cadastrarButtonIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#fff'
  },
  produtosContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: 10
  },
  produtoCard: {
    backgroundColor: '#F8F8F8', // Changed from #fff to #EBEEF3
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  produtoInfo: {
    flex: 1
  },
  produtoLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#666',
    marginBottom: 2
  },
  produtoValue: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#333',
    marginBottom: 10
  },
  produtoActions: {
    flexDirection: 'row',
    marginLeft: -12,
    alignItems: 'center',
    gap: 15,
    width: 120,
    height: 80,
    justifyContent: 'flex-start'
  },
  actionIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 60,
    padding: 5,
    position: 'relative'
  },
  navIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36
  },
  activeIndicator: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D3E5F5',
    zIndex: 0
  },
  navIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    zIndex: 1
  },
  navLabel: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Montserrat-Medium',
    marginTop: 2
  }
});

export default styles;