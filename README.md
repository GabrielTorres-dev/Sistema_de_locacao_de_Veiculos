<<<<<<< HEAD
# Sistema de Locação de Veículos

Aplicação web full stack para controle de frota e locações de uma locadora. A API REST foi desenvolvida em Node.js com Express, a persistência usa Prisma ORM com MySQL, a autenticação é baseada em JWT e a interface foi construída em React.
=======
# Sistema de Locação de veiculos.

## Identificação dos integrantes
- Doglas
- Gabriel
- Renan
- Ryan
>>>>>>> b053a7ce73a6a32fdb9d9fcf18584670cc0c38d7

## Integrantes

- Nome completo do integrante 1
- Nome completo do integrante 2
- Nome completo do integrante 3
- Nome completo do integrante 4

## Funcionalidades

- Cadastro de usuários e login com retorno de JWT
- Identificação do usuário autenticado e logout
- Cadastro de veículos com placa única e diária positiva
- Listagem de veículos com filtro de disponibilidade
- Registro de locação com cálculo automático do valor no backend
- Listagem do histórico de locações do usuário autenticado
- Finalização de locação com devolução do veículo à frota

## Tecnologias
<<<<<<< HEAD
=======
- Backend: Node.js e Express
- Front: React e JavaScript
- ORM: Prisma
- Banco de Dados: MySQL
- Validação do Banco: .env
- Autenticaçõa: JWT
- Criptografia de senhas: bcrypt
  
## Requisitos de execução
- Node.js
- npm
- MySQL ou XAMPP
>>>>>>> b053a7ce73a6a32fdb9d9fcf18584670cc0c38d7

- Backend: Node.js, Express, Prisma ORM, MySQL, JWT (jsonwebtoken), bcrypt, Zod
- Frontend: React, Vite, React Router, Axios

<<<<<<< HEAD
## Requisitos

- Node.js 18 ou superior
- MySQL 8 ou superior em execução
- Usuário do MySQL com permissão para criar bancos, pois o Prisma usa um banco sombra ao executar `migrate dev`

## Instalação e execução
=======
  Back
  
  ``cd back`` - Entra na pasta back
    
    Para iniciar o projeto
    ``npm init -y``
    ``npm install express``
    ``npm install ``
    ``npm install @prisma/client``
    ``npm install bcrypt``
    ``npm install jsonwebtoken``
    ``npm install dotenv``
    ``npm install cors``
    ``npm install -D nodemon prisma``

    Comando para instar as configurações
    ``npm install``

  Front
  
  ``cd front``  - Entra na pasta front
    ``npm install``
>>>>>>> b053a7ce73a6a32fdb9d9fcf18584670cc0c38d7

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edite o arquivo `.env` e preencha:

- `DATABASE_URL` com usuário, senha, host, porta e nome do banco, por exemplo `mysql://root:suasenha@localhost:3306/locadora_veiculos`
- `JWT_SECRET` com uma string longa e aleatória

Crie o banco e aplique as migrations:

```bash
npx prisma migrate dev
```

Popule os dados de exemplo e inicie a API:

```bash
npm run seed
npm run dev
```

A API ficará disponível em `http://localhost:3333/api`.

### 2. Frontend

Em outro terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

A interface ficará disponível em `http://localhost:5173`.

### Dados de exemplo

O seed cria o usuário `demo@locadora.com` com a senha `123456`, cinco veículos, uma locação finalizada e uma locação ativa.

## Endpoints da API

| Método | Rota | Autenticação | Descrição |
| --- | --- | --- | --- |
| POST | /api/auth/cadastro | Não | Cadastra usuário |
| POST | /api/auth/login | Não | Autentica e retorna o JWT |
| GET | /api/auth/me | Sim | Retorna o usuário autenticado |
| POST | /api/veiculos | Sim | Cadastra veículo |
| GET | /api/veiculos | Sim | Lista veículos (`?disponivel=true` para somente disponíveis) |
| POST | /api/locacoes | Sim | Registra locação |
| GET | /api/locacoes | Sim | Lista as locações do usuário autenticado |
| GET | /api/locacoes/:id | Sim | Consulta uma locação do próprio usuário |
| PATCH | /api/locacoes/:id/finalizar | Sim | Finaliza uma locação do próprio usuário |

As rotas protegidas exigem o cabeçalho `Authorization: Bearer <token>`.

## Arquitetura e decisões

- **Routes** mapeiam endpoints e encadeiam middlewares, **Controllers** tratam a entrada e a resposta HTTP, **Services** concentram validações de negócio e acesso ao Prisma.
- Validações de formato dos dados são feitas com Zod em middleware, antes de chegar ao controller.
- Senhas são armazenadas com hash bcrypt, e o `senhaHash` nunca é retornado pela API.
- O usuário de cada locação vem do token validado pelo middleware de autenticação, nunca do corpo da requisição.
- O valor total é calculado no backend: `valor da diária × ceil(duração em horas / 24)`, de modo que qualquer fração de 24 horas conta como diária completa. O valor é fixado no registro da locação e não é recalculado na devolução.
- Veículos e locações não possuem exclusão, o que preserva o histórico.
- Erros seguem códigos HTTP coerentes: 400 (validação), 401 (autenticação), 403 (acesso a locação de outro usuário), 404 (recurso inexistente) e 409 (conflito).

### Consistência em requisições simultâneas

Registro e finalização de locações rodam dentro de `prisma.$transaction`.

- No registro, o veículo é reservado por `updateMany` com a condição `disponivel: true`. O MySQL bloqueia a linha durante a atualização, então apenas uma das requisições simultâneas obtém `count = 1`. As demais recebem `count = 0` e retornam 409, e a transação é desfeita.
- Na finalização, a locação é encerrada por `updateMany` com a condição `status: 'ATIVA'`, o que impede finalizar duas vezes a mesma locação. O veículo só volta a ficar disponível na mesma transação.

## Estrutura de pastas

```
locacao-veiculos/
├── backend/
│   ├── prisma/          schema, migrations e seed
│   └── src/
│       ├── config/      variáveis de ambiente e cliente Prisma
│       ├── routes/      mapeamento dos endpoints
│       ├── controllers/ entrada e resposta HTTP
│       ├── services/    regras de negócio
│       ├── middlewares/ autenticação, validação e erros
│       ├── validators/  schemas Zod
│       └── utils/       AppError, cálculo de valor e sanitização
└── frontend/
    └── src/
        ├── routes/      rotas e rota privada
        ├── services/    cliente HTTP e chamadas à API
        ├── contexts/    contexto de autenticação
        ├── hooks/       useAuth e useMensagem
        ├── pages/       Login, Cadastro, Veiculos e Locacoes
        ├── components/  formulários, listas e cards
        ├── utils/       formatadores
        └── styles/      estilos globais
```
