# Triplist - Sistema de Checklist para Viagens

## Descrição

Triplist é um sistema de checklist para viagens que permite aos usuários criar listas personalizadas de itens para diferentes tipos de viagens e marcar os itens já separados/empacotados.

## Tecnologias

- **Frontend**: React 18.3.1 com TypeScript
- **Build Tool**: Vite 5.4.11
- **Styling**: Tailwind CSS 3.4.14
- **Routing**: React Router DOM 6.26.2
- **State Management**: TanStack Query 5.59.20 + Zustand 5.0.1
- **Forms**: React Hook Form 7.53.1 + Zod 3.23.8
- **HTTP Client**: Axios 1.7.7

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Root component
│   ├── providers.tsx      # Global providers
│   └── router.tsx         # Routing configuration
├── core/                   # Componentes e lógica compartilhada
│   ├── components/        # Componentes UI genéricos
│   ├── lib/               # Configurações de bibliotecas
│   └── utils/             # Funções utilitárias
├── pages/                  # Páginas da aplicação
│   ├── layouts/           # Layouts compartilhados
│   ├── Home/              # Página inicial
│   └── NotFound/          # Página 404
├── domain/                 # Domínios de negócio (a serem implementados)
└── assets/                 # Assets estáticos
    └── styles/            # Estilos globais
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente no .env
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## Variáveis de Ambiente

```
VITE_API_URL=http://localhost:4000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Features Implementadas

- ✅ Estrutura base do projeto
- ✅ Configuração de roteamento
- ✅ Layout principal com header e footer
- ✅ Página inicial
- ✅ Página 404
- ✅ Componentes core (Button, LoadingSpinner)
- ✅ Configuração de API client
- ✅ Configuração de TanStack Query

## Próximos Passos

- [ ] Implementar domínio de checklists
- [ ] Implementar domínio de itens
- [ ] Adicionar autenticação
- [ ] Implementar CRUD de checklists
- [ ] Implementar marcação de itens

## Convenções de Código

- Componentes em PascalCase
- Arquivos de implementação: `main.tsx`
- Arquivos de tipos: `types.ts`
- Arquivos de variantes: `variants.ts`
- Exports centralizados em `index.ts`
- JSDoc obrigatório para todos os componentes

## Licença

Private