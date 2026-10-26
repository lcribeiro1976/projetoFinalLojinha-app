import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../@types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

export default function DetailsScreen({ route }: Props) {
  const { produto } = route.params;

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      <Image source={{ uri: produto.image }} style={estilos.imagem} resizeMode="contain" />
      
      <View style={estilos.cartaoInfo}>
        <Text style={estilos.categoria}>{produto.category.toUpperCase()}</Text>
        <Text style={estilos.titulo}>{produto.title}</Text>
        <Text style={estilos.preco}>
          R$ {(produto.price * 5.5).toFixed(2).replace('.', ',')}
        </Text>
        
        <View style={estilos.divisor} />
        
        <Text style={estilos.rotuloSecao}>Descrição do Produto</Text>
        <Text style={estilos.descricao}>{produto.description}</Text>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  conteudo: { padding: 16 },
  imagem: { width: '100%', height: 260, backgroundColor: '#fff', borderRadius: 8, marginBottom: 16 },
  cartaoInfo: { backgroundColor: '#fff', borderRadius: 8, padding: 16 },
  categoria: { fontSize: 12, color: '#888', fontWeight: 'bold', letterSpacing: 1 },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#222', marginTop: 6 },
  preco: { fontSize: 22, fontWeight: 'bold', color: '#008000', marginTop: 8 },
  divisor: { height: 1, backgroundColor: '#eee', marginVertical: 14 },
  rotuloSecao: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 6 },
  descricao: { fontSize: 14, color: '#666', lineHeight: 20 },
});