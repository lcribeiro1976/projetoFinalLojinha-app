import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Produto } from '../@types/navigation';
import { buscarProdutos } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Inicio'>;

export default function HomeScreen({ navigation }: Props) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pesquisa, setPesquisa] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarDados = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarProdutos();
      setProdutos(dados);
    } catch (err: any) {
      setErro(err.message || 'Falha ao carregar a lista de produtos.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // Filtra os produtos com base no texto digitado
  const produtosFiltrados = produtos.filter((item) =>
    item.title.toLowerCase().includes(pesquisa.toLowerCase())
  );

  // Estado visual de carregamento
  if (carregando) {
    return (
      <View style={estilos.containerCentro}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={estilos.textoEstado}>Carregando produtos...</Text>
      </View>
    );
  }

  // Estado visual de erro de rede
  if (erro) {
    return (
      <View style={estilos.containerCentro}>
        <Text style={[estilos.textoEstado, { color: '#cc0000' }]}>{erro}</Text>
        <TouchableOpacity style={estilos.botaoRecarregar} onPress={carregarDados}>
          <Text style={estilos.textoBotaoRecarregar}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.campoPesquisa}
        placeholder="Buscar produto por nome..."
        placeholderTextColor="#888"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={estilos.containerVazio}>
            <Text style={estilos.textoVazio}>Nenhum produto encontrado.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.cartao}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Detalhes', { produto: item })}
          >
            <Image source={{ uri: item.image }} style={estilos.imagemCartao} resizeMode="contain" />
            <View style={estilos.conteudoCartao}>
              <Text style={estilos.tituloCartao} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={estilos.precoCartao}>
                R$ {(item.price * 5.5).toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 12 },
  containerCentro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  textoEstado: { marginTop: 12, fontSize: 16, color: '#555', textAlign: 'center' },
  botaoRecarregar: { marginTop: 16, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#0066cc', borderRadius: 8 },
  textoBotaoRecarregar: { color: '#fff', fontWeight: 'bold' },
  campoPesquisa: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cartao: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imagemCartao: { width: 70, height: 70, marginRight: 12 },
  conteudoCartao: { flex: 1, justifyContent: 'center' },
  tituloCartao: { fontSize: 14, fontWeight: '600', color: '#333' },
  precoCartao: { fontSize: 15, fontWeight: 'bold', color: '#008000', marginTop: 6 },
  containerVazio: { alignItems: 'center', marginTop: 40 },
  textoVazio: { color: '#888', fontSize: 16 },
});