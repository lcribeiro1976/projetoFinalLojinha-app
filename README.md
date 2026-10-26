# Trabalho Prático – Aplicativo Mobile: Lojinha Virtual

**Disciplina:** Dispositivos Móveis  
**Tecnologia:** React Native (Expo) com TypeScript  
**API Consumida:** Fake Store API (https://fakestoreapi.com/)  

---

## 1. Descrição do Projeto
Aplicativo móvel desenvolvido para demonstrar o consumo de serviços web RESTful, renderização dinâmica de dados em lista otimizada, busca em tempo real, navegação nativa em pilha (*Stack Navigation*) e tratamento de estados de interface do usuário (*loading*, erro de rede e lista vazia).

---

## 2. API Utilizada
* **Nome:** Fake Store API
* **Endpoint Principal:** `GET https://fakestoreapi.com/products`
* **Formato dos Dados:** JSON
* **Campos Mapeados:**
  * `id`: Identificador numérico do item
  * `title`: Nome do produto
  * `price`: Preço original em USD (convertido e formatado para BRL na interface)
  * `description`: Descrição detalhada do produto
  * `category`: Categoria do produto
  * `image`: URL da imagem do produto

---

## 3. Funcionalidades Implementadas
1. **Consumo Assíncrono da API:** Requisição HTTP com validação de status e conversão de JSON via serviço desacoplado (`src/services/api.ts`).
2. **Listagem Otimizada:** Exibição dos dados via componente `FlatList`, prevenindo problemas de desempenho em telas longas.
3. **Filtro / Busca em Tempo Real:** Filtragem dinâmica que atualiza a listagem conforme o usuário digita no campo de texto, sem distinção de maiúsculas/minúsculas (*case-insensitive*).
4. **Tratamento de Estados Visuais de UI:**
   * **Carregamento:** Indicador de progresso circular (`ActivityIndicator`) enquanto a requisição está em andamento.
   * **Erro de Conexão:** Mensagem amigável com botão "Tentar Novamente" em caso de falha de rede.
   * **Sem Resultados:** Mensagem de aviso caso a busca não localize correspondências (`ListEmptyComponent`).
5. **Navegação em Pilha (Stack Navigator):** Transição fluida entre a tela de listagem (`HomeScreen`) e a tela detalhada (`DetailsScreen`), com passagem de parâmetros tipados (`route.params`) e botão de retorno automático no cabeçalho.
6. **Tela de Detalhes:** Exibição da imagem em tamanho ampliado, categoria em destaque, título integral, preço formatado e descrição com suporte a rolagem (`ScrollView`).

---

## 4. Estrutura do Código

```text
lojinha-app/
├── src/
│   ├── @types/
│   │   └── navigation.d.ts   # Contratos de tipos (Produto e Parâmetros de Rota)
│   ├── services/
│   │   └── api.ts            # Camada de comunicação HTTP
│   └── screens/
│       ├── HomeScreen.tsx    # Listagem, busca e estados visuais
│       └── DetailsScreen.tsx # Exibição dos detalhes do item
├── App.tsx                   # Configuração das rotas e navegação Stack
└── package.json