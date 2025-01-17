# DashPro

DashPro é um dashboard integrado para gerenciar e rodar seus projetos de forma centralizada. Utilizando tecnologias modernas como React, TypeScript, Vite, Electron, Node.js e MySQL, o sistema é eficiente, rápido e fácil de usar.

## Cores utilizadas
- Principal: Verde vibrante (#32CD32) — Mais vivo para atrair atenção e indicar ações.
- Secundária: Cinza escuro (#2C3E50) — Base neutra e profissional.
- Destaques: 
- Contraste: Branco (#FFFFFF) e Preto (#000000) — Para texto e elementos de destaque.

## Tecnologias utilizadas

### Frontend
- **React** com **Vite**: Para a construção de uma interface de usuário responsiva e moderna.
- **TypeScript**: Garantia de tipos e maior confiabilidade no desenvolvimento.

### Backend
- **Node.js** com **Express**: Servidor rápido e escalável para gerenciar requisições.
- **MySQL**: Banco de dados relacional para armazenar informações dos projetos.
- **Sequelize**: ORM para simplificar as operações com o banco de dados.

### Electron
- Plataforma para criar uma aplicação desktop, integrando frontend e backend em um único executável.

## Estrutura de pastas
- **frontend/**: Contém o código React e os componentes da interface.
- **backend/**: Contém o servidor Node.js e o banco de dados.
- **electron/**: Configuração principal do Electron para empacotamento da aplicação.

Para mais detalhes sobre a estrutura, veja [aqui](/docs/Structure.md).

## Funcionalidades
1. **Visualização de projetos**:
   - Exibir todos os projetos cadastrados em um dashboard interativo.
2. **Execução de projetos**:
   - Botão de execução direta para projetos configurados.
3. **Gerenciamento de configurações**:
   - Permitir configurações personalizadas por projeto.
4. **Notificações**:
   - Alertas para status dos projetos (sucesso, erro, etc.).

## Requisitos para configuração
- **Node.js** (v16 ou superior).
- **MySQL** (v8 ou superior).
- **Git** (opcional, mas recomendado).

## Como executar o projeto
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/dashpro.git
   ```

2. Instale as dependências do frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Instale as dependências do backend:
   ```bash
   cd ../backend
   npm install
   ```

4. Configure o banco de dados MySQL em `backend/src/services/database.ts`.

5. Inicie o servidor backend:
   ```bash
   npm start
   ```

6. Inicie o frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```

7. Execute o Electron:
   ```bash
   cd ../electron
   npm start
   ```

----

## Possiveis requisitos Adicionais
- Autenticação para proteger projetos sensíveis.
- Sistema de logs para monitorar execução e possíveis erros.
- Funcionalidade de backup e restauração do banco de dados.
