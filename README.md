# 🐱 TrelloKitty Front

TrelloKitty é um gerenciador de tarefas estilo Trello, com suporte a drag and drop, visualização de métricas, filtros e outros. Este repositório contém a interface web do projeto, desenvolvida com **Vue 3 + TypeScript + Tailwind CSS + Vite**, integrando com a API RESTful do TrelloKitty Back.

## Funcionalidades

- Cadastro e login de usuários
- Organização de tarefas em colunas: **Pendente, Em andamento e Concluída**
- Drag and drop com `vuedraggable`
- Exibição de métricas (quantidade por status, tarefas mais recentes etc.)
- Filtro de tarefas por usuário e status
- Interface responsiva com Tailwind CSS
- Autenticação com JWT (Token)

---

## Tecnologias

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [vuedraggable](https://github.com/SortableJS/vue.draggable.next)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)

---

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/isobew/trellokitty-front.git
   cd trellokitty-front

2. Instale as dependências:
    ```bash
    npm install

3. Copiar e alterar o nome do .env.example para .env configurar variáveis de ambiente
    ```bash
    cp .env.example .env

4. Execute o projeto localmente:
    ```bash
    npm run dev

5. Acesse o link no navegador:
    ```bash
    http://localhost:5173

##  Caso de uso

Você é desenvolvedor e precisa gerenciar o progresso de tarefas de um projeto com sua equipe.

Para isso, você pode acessar o TrelloKitty, fazer login e usar o board.

Você pode criar tarefas como “Implementar login” ou “Corrigir bug do botão”, e também pode editá-las, excluí-las e ver detalhes.

Conforme as tarefas progridem, podem ser movidas entre as colunas Pendente, Em andamento e Concluída.

No painel de métricas, você pode visualizar:

- Quantas tarefas foram concluídas;

- Quais tarefas estão pendentes;

- Quem está trabalhando em cada tarefa;

- Também pode usar filtros por usuário ou status para facilitar o acompanhamento.

---

### Tela de Login
![Image](https://github.com/user-attachments/assets/6a3de28a-8981-4c0c-a865-f946fa8a0efd)

### Tela de Cadastro
![Image](https://github.com/user-attachments/assets/5bf847ff-07cc-48fa-92a7-4bf51e663c10)

### Tela de Quadro de Tarefas
![Image](https://github.com/user-attachments/assets/e6c65211-b5b1-4435-bd64-d72ebdb8bf81)

### Tela de Relatórios
![Image](https://github.com/user-attachments/assets/284ce831-3cab-4539-90de-b7033ad06659)