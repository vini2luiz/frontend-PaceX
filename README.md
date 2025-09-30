# PaceX

Aplicação web de fitness e acompanhamento de treinos, com dashboard moderno, login seguro e interface responsiva.

## 🚀 Demonstração

![Dashboard](./docs/dashboard.png)
![Login](./docs/login.png)

## ✨ Funcionalidades

- **Login seguro** com email e senha
- **Dashboard** com estatísticas semanais, volume total, tempo de treino e recordes
- **Sidebar** com navegação rápida (Início, Treino, Feed, Chat IA, Perfil)
- **Cartão de início rápido** para treinos
- **Filtro e busca** de treinos recentes
- **Notificações** e configurações no topo
- **Design responsivo** e tema escuro

## 🛠️ Tecnologias Utilizadas

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build e dev server)
- [Tailwind CSS](https://tailwindcss.com/) (estilização)
- [Radix UI](https://www.radix-ui.com/) (componentes acessíveis)
- [Lucide React](https://lucide.dev/) (ícones)
- [Recharts](https://recharts.org/) (gráficos)

## 📦 Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/vini2luiz/frontend-PaceX.git
   cd frontend-PaceX
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```
3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
4. **Acesse:**
   - [http://localhost:5173/](http://localhost:5173/)

## 📁 Estrutura do Projeto

```
frontend-PaceX/
├── src/
│   ├── components/        # Componentes principais (Dashboard, Login, etc)
│   ├── ui/               # Componentes de interface reutilizáveis
│   ├── styles/           # Estilos globais
│   ├── figma/            # Componentes auxiliares
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Ponto de entrada
│   └── index.css         # Estilos globais
├── public/               # Assets públicos
├── .gitignore            # Ignora arquivos desnecessários
├── package.json          # Dependências e scripts
├── tailwind.config.js    # Configuração do Tailwind
├── vite.config.ts        # Configuração do Vite
└── README.md             # Este arquivo
```

## 🖥️ Telas

- **Login:**
  - Tela de autenticação com campos de email e senha
  - Botão "Entrar como Demo"
  - Link "Esqueceu sua senha?"
- **Dashboard:**
  - Sidebar com navegação
  - Estatísticas semanais
  - Cartão de início rápido
  - Grid de métricas
  - Filtros e busca de treinos

## 📋 Scripts Disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera build de produção
- `npm run preview` — Visualiza build de produção localmente
- `npm run lint` — Analisa o código com ESLint

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com 💙 por [vini2luiz](https://github.com/vini2luiz)
