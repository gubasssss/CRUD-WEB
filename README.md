
Este é um projeto de aplicação web full-stack desenvolvido como atividade prática. O objetivo é criar um sistema com operações CRUD com autenticação de usuários e gerenciamento de senhas, utilizando TypeScript tanto no backend quanto no frontend.

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:
* Node.js (versão 16 ou superior)
* PostgreSQL (servidor de banco de dados)
* Um cliente de banco de dados como DBeaver ou pgAdmin

## Instalação e Configuração

Siga estes passos para configurar o ambiente de desenvolvimento localmente.

### 1. Clone o Repositório com esses códigos ou com o GitHub Desktop

git clone <URL_DO_SEU_REPOSITORIO_NO_GITHUB>
cd <NOME_DA_PASTA_DO_PROJETO>

### 2. Configure o PostgreSQL

1.  Abra seu cliente de banco de dados e crie um novo banco de dados. Ex: `crud_app_db`.
2.  Execute o script SQL abaixo para criar as tabelas necessárias.

    -- Tabela de Usuários
    CREATE TABLE usuarios (
        "Username" VARCHAR(30) PRIMARY KEY NOT NULL,
        "Password" VARCHAR(128) NOT NULL,
        "Nome" VARCHAR(120) NOT NULL,
        "Tipo" CHAR(1) NOT NULL,
        "Status" CHAR(1) NOT NULL DEFAULT 'A',
        "Quant_Acesso" INT DEFAULT 0,
        "Failed_Login_Attempts" INT DEFAULT 0
    );

    -- Tabela para o CRUD de Tarefas
    CREATE TABLE tarefas (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        owner_username VARCHAR(30) NOT NULL,
        FOREIGN KEY (owner_username) REFERENCES usuarios("Username") ON DELETE CASCADE
    );
    

### 3. Configure o Backend

1.  Navegue até a pasta do backend:

    cd backend

2.  Modifique o arquivo `.env` na raiz da pasta `backend` e adicionando suas credenciais do PostgreSQL e segredos para os tokens:

    backend/.env

    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=seu_usuario_postgres
    DB_PASSWORD=sua_senha_postgres
    DB_DATABASE=crud_app_db

    JWT_SECRET=seu_segredo_jwt_super_secreto
    JWT_RESET_SECRET=outro_segredo_diferente_para_reset

3.  Instale as dependências:

    npm install


### 4. Configure o Frontend

1.  Em um **novo terminal**, navegue até a pasta do frontend:

    cd frontend

2.  Instale as dependências:

    npm install

## Como Executar a Aplicação

Você precisará de dois terminais abertos simultaneamente.

1.  **Terminal 1 (Backend):**

    cd backend
    npm run dev

    *O servidor do backend estará rodando em `http://localhost:3333`.*

2.  **Terminal 2 (Frontend):**

    cd frontend
    npm start

    *A aplicação frontend abrirá no seu navegador em `http://localhost:3000`.*

## Como Criar o Primeiro Usuário Administrador

Para usar o sistema, você precisa de um usuário administrador. O primeiro usuário precisa ser criado manualmente no banco de dados.

### Passo A: Gerar a Senha Criptografada

1.  Execute o script no terminal (na pasta `backend`):

    node hash-password.js

2.  **Copie o hash** gerado.

### Passo B: Inserir o Usuário no Banco

1.  Abra seu cliente de banco de dados.
2.  Execute o seguinte comando SQL, substituindo `<SEU_HASH_AQUI>` pelo valor que você copiou:

    INSERT INTO usuarios ("username", "password", "nome", "tipo", "status", )
    VALUES ('admin', '<SEU_HASH_AQUI>', 'Administrador Principal', '0', 'A',);

3.  Agora você pode fazer login na interface web com o usuário `admin` e a senha que você escolheu.
