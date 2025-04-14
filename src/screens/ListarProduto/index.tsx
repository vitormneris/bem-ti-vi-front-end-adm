import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import styles from './style';

type CategoriaType = {
  id: number;
  nome: string;
  imagem: any;
};

const Categorias = ({ titulo = "   CATEGORIAS" }: { titulo?: string }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [categorias, setCategorias] = useState<CategoriaType[]>([
    { id: 1, nome: 'Alimentos', imagem: require('../../assets/images/racao.jpg') },
    { id: 2, nome: 'Beleza', imagem: require('../../assets/images/roupinha.jpg') },
    { id: 3, nome: 'Diversão', imagem: require('../../assets/images/brinquedos.jpg') },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Image 
              source={require('../../assets/images/seta-voltar.png')} 
              style={styles.backIcon} 
            />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{titulo}</Text>
            <Image 
              source={require('../../assets/images/categorias.png')} 
              style={styles.menuIcon} 
            />
          </View>
        </View>

        {/* Botão Cadastrar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cadastrarButton}>
            <Image source={require('../../assets/images/add.png')} style={styles.cadastrarButtonIcon} />
            <Text style={styles.cadastrarButtonText}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Categorias */}
        <View style={styles.categoriasContainer}>
          {categorias.map((categoria) => (
            <View key={categoria.id} style={styles.categoriaCard}>
              <View style={styles.categoriaInfo}>
                <Text style={styles.categoriaLabel}>Nome da Categoria</Text>
                <Text style={styles.categoriaValue}>{categoria.nome}</Text>
                
                <Text style={styles.categoriaLabel}>Imagem da categoria</Text>
                <Image 
                  source={categoria.imagem} 
                  style={styles.categoriaImage} 
                />
              </View>
              
              <View style={styles.categoriaActions}>
                <TouchableOpacity>
                  <Image 
                    source={require('../../assets/images/olhos.png')} 
                    style={styles.actionIcon} 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity>
                  <Image 
                    source={require('../../assets/images/configuracao.png')} 
                    style={styles.actionIcon} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Navegação Inferior */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('home')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'home' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/home.png')} 
              style={styles.navIcon} 
            />
          </View>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('comprar')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'comprar' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/carrinho.png')} 
              style={styles.navIcon} 
            />
          </View>
          <Text style={styles.navLabel}>Comprar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('servicos')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'servicos' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/cachorro.png')} 
              style={styles.navIcon} 
            />
          </View>
          <Text style={styles.navLabel}>Serviços</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('perfil')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'perfil' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/perfil.png')} 
              style={styles.navIcon} 
            />
          </View>
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Categorias;