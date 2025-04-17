# TODO API - Desafio Node.JS

API RESTful para gerenciamento de tarefas com autenticação JWT, desenvolvida como parte de um desafio técnico.

---

## 📄 Tecnologias Utilizadas

- Node.js 18 (ESModules)
- Express
- Prisma ORM com SQLite
- JWT para autenticação
- Swagger (OpenAPI 3.0)
- Jest + Supertest para testes unitários
- Docker (para execução containerizada)

---

## 🔄 Instalação Local

```bash
git clone https://github.com/kemp777/viceri-todo-api.git
cd viceri-todo-api
npm install
npx prisma generate
```

Crie o arquivo .env com base em .env.example e configure as variáveis de ambiente necessárias.          

Execute em modo desenvolvimento:

```bash
npm run dev
```

Acesse: [http://localhost:3000/api/docs](http://localhost:3000/api/docs) para ver a documentação Swagger

---

## 🧰 Testes

```bash
npm run test         # Roda os testes unitários
npm run test:coverage # Gera cobertura de testes
```

Cobertura superior a **50%** com Jest e Supertest.

---

## 🚀 Execução com Docker

```bash
docker build -t viceri-todo-api .
docker run -p 3000:3000 --env-file .env viceri-todo-api
```

A aplicação estará acessível em:

```
http://localhost:3000/api
http://localhost:3000/api/docs
```

---

## ☁️ Publicação Simples na AWS

Para publicar esta aplicação na AWS de forma simples:

1. Utilize o **Dockerfile** incluso para gerar uma imagem
2. Suba a imagem para um **container registry** (ex: Amazon ECR)
3. Configure um ambiente no **AWS Elastic Beanstalk** ou **ECS/Fargate** com suporte a container
4. Forneça variáveis de ambiente no console AWS (ou via Secrets Manager)
5. Configure uma instância com porta 3000 exposta via Load Balancer ou API Gateway

---

## 🎓 Endpoints Principais

| Método | Rota                 | Descrição                                 |
| ------ | -------------------- | ----------------------------------------- |
| POST   | /api/auth/register   | Cria um novo usuário                      |
| POST   | /api/auth/login      | Autentica e retorna um JWT                |
| GET    | /api/tasks           | Lista tarefas do usuário logado           |
| POST   | /api/tasks           | Cria nova tarefa                          |
| PATCH  | /api/tasks/\:id/done | Marca tarefa como concluída (persistente) |

Para endpoints protegidos, envie o header:

```http
Authorization: Bearer <seu_token_jwt>
```

---

## 📂 Estrutura do Projeto

```
src/
├── controllers/
├── routes/
├── services/
├── middlewares/
├── config/
├── server.js
Dockerfile
.dockerignore
.env (local)
```

---

## 🙌 Autor

Thiago Kemp

---

