{
  "app": {
    "frontend": {
      "src": {
        "assets": "Imagens, ícones e arquivos estáticos.",
        "components": {
          "Header": {
            "Header.tsx": "Componente para o cabeçalho do dashboard.",
            "Header.module.css": "Estilos específicos para o cabeçalho."
          },
          "Sidebar": {
            "Sidebar.tsx": "Componente para o menu lateral.",
            "Sidebar.module.css": "Estilos específicos para o menu lateral."
          },
          "ProjectCard": {
            "ProjectCard.tsx": "Componente para exibir informações de um projeto.",
            "ProjectCard.module.css": "Estilos específicos para os cards de projeto."
          }
        },
        "pages": {
          "Home": {
            "Home.tsx": "Página inicial do dashboard.",
            "Home.module.css": "Estilos específicos da página inicial."
          },
          "Settings": {
            "Settings.tsx": "Página de configurações.",
            "Settings.module.css": "Estilos específicos para configurações."
          }
        },
        "App.tsx": "Componente principal do React.",
        "index.tsx": "Ponto de entrada do React renderizando o App.",
        "vite.config.ts": "Configuração do Vite para o projeto."
      },
      "public": "Arquivos públicos como favicon, manifest.json."
    },
    "backend": {
      "src": {
        "controllers": {
          "projectController.ts": "Controlador para gerenciar operações relacionadas aos projetos."
        },
        "models": {
          "projectModel.ts": "Modelo Sequelize para os projetos."
        },
        "routes": {
          "projectRoutes.ts": "Definição de rotas para o CRUD de projetos."
        },
        "services": {
          "database.ts": "Configuração e conexão com o MySQL usando Sequelize."
        },
        "app.ts": "Configuração principal do servidor Express."
      },
      "package.json": "Dependências do Node.js e scripts do backend.",
      "tsconfig.json": "Configuração do TypeScript para o backend."
    },
    "electron": {
      "main.ts": "Configuração principal do Electron para criar a janela da aplicação.",
      "preload.ts": "Configuração para expor APIs do Node.js para o frontend."
    },
    "README.md": "Descrição geral do projeto e instruções de uso.",
    ".gitignore": "Arquivos e pastas a serem ignorados pelo Git.",
    "package.json": "Dependências gerais e scripts globais."
  }
}
