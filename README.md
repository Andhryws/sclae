# 🧪 SCLAE - Sistema de Controle de Laboratórios e Equipamentos

Backend desenvolvido em Node.js para controle de laboratórios, equipamentos, reservas e manutenção.

---

## 📌 Objetivo

O sistema SCLAE tem como objetivo organizar o uso de laboratórios e equipamentos, permitindo:

- Cadastro e gerenciamento de usuários
- Controle de laboratórios e equipamentos
- Sistema de reservas com validação de conflito de horário
- Controle de manutenção de equipamentos
- Relacionamento entre entidades do sistema

---

## ⚙️ Tecnologias

- Node.js
- Express
- Sequelize ORM
- SQLite
- JavaScript (ES6+)
- Nodemon

---

## 🗂️ Estrutura do Projeto

src/
├── config/        (configuração do banco de dados)
├── controllers/   (lógica do sistema)
├── models/        (modelos Sequelize)
├── routes/        (rotas da API)
├── app.js         (configuração do Express)
└── server.js      (inicialização do servidor)

---

## 🚀 Como executar o projeto

### 1. Instalar dependências
npm install

---

### 2. Rodar em modo desenvolvimento
npm run dev

---

### 3. Rodar em modo produção
npm start

---

## 🗄️ Banco de dados

O projeto utiliza SQLite:

- Não precisa instalar banco externo
- O arquivo database.sqlite é criado automaticamente
- As tabelas são geradas via Sequelize (sync)

---

## 📌 Funcionalidades

### 👤 Usuários
- Criar usuário
- Listar usuários
- Atualizar usuário
- Remover usuário

### 🏫 Laboratórios
- Criar laboratório
- Listar laboratórios
- Atualizar status

### 💻 Equipamentos
- Criar equipamentos vinculados a laboratórios
- Atualizar status
- Listar equipamentos

### 📅 Reservas
- Criar reserva de laboratório
- Cancelar reserva (controle lógico)
- Listar reservas
- Validação de conflito de horário
- Controle de permissão (aluno, professor, administrador)

### 🔧 Manutenção
- Criar solicitação de manutenção
- Atualizar status (aberto, em manutenção, concluído)

---

## 🔐 Regras de negócio

- Apenas professores e administradores podem criar reservas
- Não pode haver conflito de horários
- Equipamentos devem pertencer a um laboratório
- Laboratórios em manutenção não podem ser reservados
- Cancelamento de reservas é controlado por permissão
- Usuários possuem níveis de acesso

---

## 🧪 Testes da API

Recomenda-se usar Thunder Client ou Postman.

Exemplos de rotas:

POST /usuarios
GET /usuarios
POST /reservas
GET /reservas



