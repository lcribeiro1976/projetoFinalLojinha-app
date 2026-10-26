import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from './src/@types/navigation';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: { backgroundColor: '#0066cc' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Inicio" 
          component={HomeScreen} 
          options={{ title: 'Catálogo de Produtos' }} 
        />
        <Stack.Screen 
          name="Detalhes" 
          component={DetailsScreen} 
          options={{ title: 'Detalhes do Produto' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}