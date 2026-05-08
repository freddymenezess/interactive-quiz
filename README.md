# 🧠 QuizApp

> Plataforma interativa de quiz com ranking global, categorias e painel de administração.

---

## 📋 Sobre o Projeto

O **QuizApp** é uma aplicação web onde utilizadores podem criar conta, fazer login e responder a perguntas de quiz por categoria ou em modo aleatório. Os resultados são registados num ranking público visível a todos. Administradores têm acesso a ferramentas de moderação, incluindo a possibilidade de banir utilizadores.

---

## ✨ Funcionalidades

- 🔐 Autenticação de utilizadores (registo e login)
- 🎯 Quizzes por categoria ou perguntas aleatórias
- 🏆 Ranking global visível a todos
- 🛡️ Painel de administração com gestão de utilizadores (ban)

---

## 🛠️ Tecnologias

### Frontend
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend (API)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

---

## 📁 Estrutura do Projeto

```
/
├── frontend/     # Aplicação React
└── api/          # Servidor Node.js + Express
```

---

## 📦 Instalação

### Pré-requisitos

- Node.js >= 18
- npm
- PostgreSQL instalado e a correr

### 1. Clonar o repositório

```bash
git clone https://github.com/freddymenezess/interactive-quiz.git
cd interactive-quiz
```

### 2. Configurar o Backend (API)

```bash
cd api
npm install
```

Cria um ficheiro `.env` dentro da pasta `api/` com base no exemplo abaixo:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/interactive_quiz"
JWT_SECRET=seu_segredo_aqui
PORT=3000
```

Cria a base de dados localmente:

```bash
psql -U postgres -c "CREATE DATABASE interactive_quiz;"
```

Aplica as migrações:

```bash
npx prisma migrate deploy
```

Popula a base de dados com os dados iniciais (categorias e dificuldades):

```bash
npx prisma db seed
```

### 3. Configurar o Frontend

```bash
cd ../frontend
npm install
```

Cria um ficheiro `.env` dentro da pasta `frontend/` com base no exemplo abaixo:

```env
VITE_API_URL=http://localhost:3000
```

---

## ▶️ Como Executar

### Backend

```bash
cd api
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

Acede à aplicação em: `http://localhost:5173`

---
 
## 🧹 Lint & Formatação
 
Para manter o código organizado e consistente, utiliza os scripts disponíveis em ambas as pastas (`frontend/` e `api/`):
 
```bash
# Verificar problemas no código
npm run lint
 
# Formatar o código automaticamente
npm run format
```
 
> Recomendado correr antes de cada commit para garantir a qualidade do código.
 
---

## 🤝 Contribuição

Contribuições são bem-vindas! Segue os passos:

1. Faz um fork do projeto
2. Cria uma branch: `git checkout -b feature/minha-feature`
3. Faz commit das alterações: `git commit -m 'feat: minha nova feature'`
4. Faz push: `git push origin feature/minha-feature`
5. Abre um Pull Request

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).