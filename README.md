# Educahub API

A Educahub API é uma aplicação desenvolvida com Node.js, Express e Sequelize, destinada à gestão de postagens e categorias de um sistema educacional. Esta documentação fornece um guia abrangente para a configuração inicial, a arquitetura da aplicação e o uso das APIs.

## Tabela de Conteúdos

1. [Pré-requisitos](#pré-requisitos)
2. [Configuração Inicial](#configuração-inicial)
3. [Arquitetura da Aplicação](#arquitetura-da-aplicação)
4. [Uso das APIs](#uso-das-apis)
5. [Executando os Testes](#executando-os-testes)
6. [Deploy](#deploy)
7. [Licença](#licença)
8. [Contribuição](#contribuição)

## Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [SQL Server](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)

## Configuração Inicial

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/almir-ops/educahub-api.git
   cd educahub-api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Crie um arquivo `.env` na raiz do projeto** e adicione suas configurações de banco de dados:
   ```plaintext
   DB_HOST=seu_host
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=seu_banco_de_dados
   DB_PORT=sua_porta
   ```

4. **Inicie a aplicação:**
   ```bash
   npm start
   ```

## Arquitetura da Aplicação

A aplicação é estruturada da seguinte forma:

- `src/`
  - `config/`: Contém a configuração de conexão com o banco de dados e outras configurações globais.
  - `models/`: Define os modelos de dados utilizados pela aplicação (por exemplo, Post, Category).
  - `routes/`: Define as rotas da API e a lógica de controle para cada endpoint.
  - `swagger/`: Configuração do Swagger para documentação da API.
  - `index.js`: O ponto de entrada da aplicação, onde a aplicação Express é configurada e iniciada.

## Uso das APIs

### Endpoints de Categoria

- **Criar uma nova categoria**
  - **Método:** POST
  - **URL:** `/api/categories`
  - **Corpo da requisição:**
    ```json
    {
      "name": "Nome da Categoria"
    }
    ```

- **Listar todas as categorias**
  - **Método:** GET
  - **URL:** `/api/categories`

- **Atualizar uma categoria**
  - **Método:** PUT
  - **URL:** `/api/categories/:id`
  - **Corpo da requisição:**
    ```json
    {
      "name": "Novo Nome da Categoria"
    }
    ```

- **Deletar uma categoria**
  - **Método:** DELETE
  - **URL:** `/api/categories/:id`

### Endpoints de Postagem

- **Criar um novo post**
  - **Método:** POST
  - **URL:** `/api/posts`
  - **Corpo da requisição:**
    ```json
    {
      "title": "Título do Post",
      "content": "Conteúdo do Post",
      "author": "Autor do Post",
      "categoryId": "ID da Categoria"
    }
    ```

- **Listar todos os posts**
  - **Método:** GET
  - **URL:** `/api/posts`

- **Atualizar um post**
  - **Método:** PUT
  - **URL:** `/api/posts/:id`
  - **Corpo da requisição:**
    ```json
    {
      "title": "Novo Título do Post",
      "content": "Novo Conteúdo do Post",
      "author": "Novo Autor do Post",
      "categoryId": "ID da Categoria"
    }
    ```

- **Deletar um post**
  - **Método:** DELETE
  - **URL:** `/api/posts/:id`

## Executando os Testes

Para executar os testes, utilize o comando:

```bash
npm test
```

Os testes automatizados verificarão a funcionalidade das APIs, garantindo que todos os endpoints estejam funcionando conforme o esperado.

## Deploy

A aplicação está hospedada no [Render](https://educahub-api.onrender.com/docs/#/) e está acessível através do link acima. A hospedagem é feita utilizando Docker, integrada à minha conta no Docker Hub. Certifique-se de que suas variáveis de ambiente estejam configuradas corretamente.
