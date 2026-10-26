import { Produto } from '../@types/navigation';

const URL_BASE = 'https://fakestoreapi.com';

export async function buscarProdutos(): Promise<Produto[]> {
  const resposta = await fetch(`${URL_BASE}/products`);
  
  if (!resposta.ok) {
    throw new Error(`Erro na conexão com o servidor: código ${resposta.status}`);
  }

  return resposta.json();
}