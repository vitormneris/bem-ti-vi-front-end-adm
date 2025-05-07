import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, TextInput } from 'react-native';
import styles from './style';

type CategoriaType = {
  id: number;
  nome: string;
  imagem: any;
};

const Categorias = ({ titulo = "   CATEGORIAS" }: { titulo?: string }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchText, setSearchText] = useState('');
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);

  const filteredCategorias = categorias.filter(categoria =>
    categoria.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    const fetchCategorias = async () => {
      try{
        const response = await fetch('http://URL:8080/categoria/paginacao?isActive=true&pageSize=3&page=0');
        if (!response.ok){
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        const categoriasFormatadas = data.content.map((item: any) => ({
          id: item.id,
          nome: item.name || 'Nome não disponível',
          imagem: item.pathImage || null,
        }));
        setCategorias(categoriasFormatadas)
      } catch (err){
        console.error('Erro ao buscar categorias:',err);
      }
    }
    fetchCategorias()
  })

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

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Image 
            source={require('../../assets/images/busca.png')} 
            style={styles.searchIcon} 
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar categoria..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Lista de Categorias */}
        <View style={styles.categoriasContainer}>
          {filteredCategorias.map((categoria) => (
            <View key={categoria.id} style={styles.categoriaCard}>
              <View style={styles.categoriaInfo}>
                <Text style={styles.categoriaLabel}>Nome da Categoria</Text>
                <Text style={styles.categoriaValue}>{categoria.nome}</Text>
                
                <Text style={styles.categoriaLabel}>Imagem da categoria</Text>
                <Image 
                  source={{ uri: categoria.imagem }}  
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
          <Text style={styles.navLabel}>Loja</Text>
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