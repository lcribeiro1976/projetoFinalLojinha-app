export interface Produto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type RootStackParamList = {
  Inicio: undefined;
  Detalhes: { produto: Produto };
};