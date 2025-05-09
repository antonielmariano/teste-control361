# Sistema de Rastreamento de Veículos

Um sistema moderno para rastreamento e monitoramento de veículos em tempo real, construído com React, TypeScript, Vite e Google Maps API.

## Funcionalidades

- **Mapa Interativo**: Visualização de veículos em mapa usando Google Maps no modo escuro
- **Marcadores Personalizados**: Ícones distintos para veículos ligados (verde) e desligados (vermelho)
- **Informações Detalhadas**: Exibição dos dados completos do veículo ao clicar no marcador
- **Busca e Filtros**: Capacidade de buscar veículos por placa ou frota
- **Tabela de Veículos**: Visualização em lista dos veículos cadastrados

## Tecnologias Utilizadas

- **React 19**: Framework de UI moderno para construção da interface
- **TypeScript**: Tipagem estática para código mais seguro
- **Vite**: Build tool rápido e eficiente
- **Tailwind CSS**: Framework CSS para estilização
- **Google Maps API**: API de mapas com suporte a marcadores avançados
- **Axios**: Cliente HTTP para comunicação com o backend
- **React Query**: Gerenciamento de estado para dados assíncronos

## Configuração do Ambiente

### Pré-requisitos

- Node.js 18 ou superior
- API Key do Google Maps

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
VITE_GOOGLE_MAPS_API_KEY=sua_chave_api_aqui
VITE_GOOGLE_MAPS_MAP_ID=seu_map_id_aqui
```

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

## Configuração do Mapa

O mapa foi configurado para iniciar sempre no modo escuro, garantindo melhor visibilidade dos marcadores e suporte para estilos personalizados.

### Personalização dos Marcadores

Os marcadores foram implementados usando SVG customizado, incluindo:
- Forma de pino com cor diferenciada para cada estado
- Ícone de veículo no centro do marcador
- Placa do veículo exibida abaixo do marcador

## Estrutura do Projeto

```
src/
├── components/         # Componentes React
│   ├── MapTracker.tsx  # Componente principal do mapa
│   ├── VehicleTable.tsx # Tabela de veículos
│   └── ...
├── types/              # Tipos TypeScript
│   └── vehicle.ts      # Interfaces para veículos
├── config/             # Configurações
│   └── api.ts          # Configuração do Axios
└── ...
```

## Melhorias Futuras

- Rastreamento em tempo real com WebSockets
- Histórico de percurso dos veículos
- Dashboard com estatísticas
- Modo offline com armazenamento local
- Notificações de eventos importantes
