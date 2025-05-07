import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, TextInput } from 'react-native';
import styles from './style';

type ProdutoType = {
  id: number;
  nome: string;
  categoria: string;
  valor: string;
};

const Produtos = ({ titulo = "   PRODUTOS" }: { titulo?: string }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchText, setSearchText] = useState('');
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchText.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(searchText.toLowerCase())
  );
  useEffect(() => {
    const fetchProdutos = async () => {
      try{
        const response = await fetch('http://URL:8080/produto/paginacao?isActive=true&pageSize=5&page=0');
        if (!response.ok){
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        const produtosFormatados = data.content.map((item: any) => ({
          id: item.id,
          nome: item.name || 'Nome não disponível',
          categoria: item.categories?.[0]?.name || 'Sem categoria',
          valor: item.price ? `R$${item.price.toFixed(2).replace('.', ',')}` : 'R$0,00',
        }));
        setProdutos(produtosFormatados)
      } catch (err){
        console.error('Erro ao buscar produtos:',err);
      }
    }
    fetchProdutos()
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
              source={require('../../assets/images/icone-menu.png')} 
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
            placeholder="Buscar produto..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Lista de Produtos */}
        <View style={styles.produtosContainer}>
          {filteredProdutos.map((produto) => (
            <View key={produto.id} style={styles.produtoCard}>
              <View style={styles.produtoInfo}>
                <Text style={styles.produtoLabel}>Nome</Text>
                <Text style={styles.produtoValue}>{produto.nome}</Text>
                
                <Text style={styles.produtoLabel}>Categoria</Text>
                <Text style={styles.produtoValue}>{produto.categoria}</Text>
                
                <Text style={styles.produtoLabel}>Valor</Text>
                <Text style={styles.produtoValue}>{produto.valor}</Text>
              </View>
              
              <View style={styles.produtoActions}>
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
          onPress={() => setActiveTab('loja')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'loja' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/cachorro.png')} 
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
              source={require('../../assets/images/carrinho.png')} 
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

export default Produtos;