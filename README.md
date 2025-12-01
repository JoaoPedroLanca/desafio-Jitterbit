# API de Pedidos - Jitterbit Challenge

API REST desenvolvida em Node.js com Express para gerenciamento de pedidos, utilizando PostgreSQL como banco de dados, autenticação JWT e documentação Swagger.

## 🚀 Tecnologias

- **Node.js** com Express
- **PostgreSQL** (via Docker)
- **Sequelize** (ORM)
- **JWT** (Autenticação)
- **Swagger** (Documentação da API)
- **bcryptjs** (Hash de senhas)

## 📋 Pré-requisitos

- Node.js (versão LTS)
- Docker e Docker Compose
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd desafio-Jitterbit
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (da forma que achar melhor ou pode seguir o que eu usei abaixo) criando um arquivo `.env` na raiz do projeto :
```env
PORT=3000

# Configurações do PostgreSQL
DB_HOST=localhost
DB_PORT=5438
DB_USER=jitteruser
DB_PASS=jitterpass
DB_NAME=jitterdb
DB_DIALECT=postgres

# Variáveis para o docker-compose.yml
POSTGRES_USER=jitteruser
POSTGRES_PASSWORD=jitterpass
POSTGRES_DB=jitterdb

# JWT
JWT_SECRET=sua_chave
JWT_EXPIRES_IN=24h

# Usuário padrão para autenticação
DEFAULT_USER=admin
DEFAULT_PASSWORD=admin123
```

4. Inicie o PostgreSQL com Docker Compose:
```bash
docker-compose up -d
```

5. Inicie o servidor:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## 📚 Documentação da API (Swagger)

Acesse a documentação interativa em:
```
http://localhost:3000/api-docs
```

## 🔐 Autenticação

### Como fazer login no Swagger:

1. No Swagger UI, localize a seção **"Autenticação"**
2. Expanda o endpoint `POST /auth/login`
3. Clique em **"Try it out"**
4. Cole o seguinte JSON no campo "Request body":
```json
{
  "username": "admin",
  "password": "admin123"
}
```
5. Clique em **"Execute"**
6. Copie o `token` retornado na resposta
7. Clique no botão **"Authorize"** (cadeado no topo da página)
8. Cole o token no campo "Value" (sem a palavra "Bearer")
9. Clique em **"Authorize"** e depois **"Close"**

Agora você pode testar todos os endpoints de pedidos que requerem autenticação.

## 📡 Endpoints

### Autenticação
- `POST /auth/login` - Autentica usuário e retorna token JWT

### Pedidos (requerem autenticação)
- `POST /order` - Cria um novo pedido
- `GET /order/list` - Lista todos os pedidos
- `GET /order/:orderId` - Busca um pedido pelo ID
- `PUT /order/:orderId` - Atualiza um pedido
- `DELETE /order/:orderId` - Deleta um pedido

## 🗄️ Banco de Dados

O PostgreSQL é executado via Docker Compose. O arquivo `docker-compose.yml` configura:
- Imagem PostgreSQL 15
- Porta mapeada: `5438:5432` (porta externa 5438, interna 5432)
- Volume persistente para os dados
- Variáveis de ambiente do `.env`

Para parar o container:
```bash
docker-compose down
```

## 👤 Autenticação - Simulação de Usuários

**Por que não criei uma tabela de usuários?**

O desafio não solicitava a criação de um sistema de usuários completo. A autenticação JWT foi implementada como **recurso adicional** para demonstrar conhecimento, mas sem a necessidade de criar uma entidade `User` no banco de dados.

A solução atual utiliza um **array em memória** com um usuário padrão:
- **Username:** `admin` (ou valor de `DEFAULT_USER` no `.env`)
- **Password:** `admin123` (ou valor de `DEFAULT_PASSWORD` no `.env`)

A senha é hasheada com `bcryptjs` para segurança. Em um ambiente de produção, seria necessário criar uma tabela `User` no banco de dados para gerenciar múltiplos usuários, roles, etc.

## 📝 Estrutura do Projeto

```
src/
├── app.js                 # Configuração do Express
├── server.js              # Inicialização do servidor
├── config/
│   ├── database.js        # Configuração do Sequelize
│   └── swagger.js         # Configuração do Swagger
├── controllers/
│   ├── authController.js  # Controller de autenticação
│   └── OrderController.js # Controller de pedidos
├── entities/
│   ├── index.js          # Relacionamentos dos modelos
│   ├── Order.js          # Modelo Order
│   └── Item.js           # Modelo Item
├── middlewares/
│   ├── authMiddleware.js  # Middleware de autenticação JWT
│   └── errorHandler.js    # Tratamento global de erros
├── routes/
│   ├── authRoutes.js     # Rotas de autenticação
│   └── orderRoutes.js    # Rotas de pedidos
└── utils/
    └── mapOrderPayload.js # Transformação de dados
```

## 🔄 Transformação de Dados

A API recebe dados em português no input e os transforma para o formato interno do banco que foi requerido:

**Entrada:**
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

**Armazenado no banco:**
```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": "2434",
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

## 🧪 Testando com cURL

### Login:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Criar pedido (substitua SEU_TOKEN):
```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [{
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }]
  }'
```

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento (com nodemon)
- `npm start` - Inicia o servidor em modo produção

## ✅ Requisitos do Desafio

- ✅ Criar pedido (POST /order)
- ✅ Buscar pedido por ID (GET /order/:orderId)
- ✅ Listar todos os pedidos (GET /order/list)
- ✅ Atualizar pedido (PUT /order/:orderId)
- ✅ Deletar pedido (DELETE /order/:orderId)
- ✅ Banco de dados PostgreSQL
- ✅ Transformação de dados (mapping)
- ✅ Código organizado e comentado
- ✅ Tratamento de erros robusto
- ✅ Respostas HTTP adequadas
- ✅ Autenticação JWT (recurso adicional)
- ✅ Documentação Swagger (recurso adicional)

