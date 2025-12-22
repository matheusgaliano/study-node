console.log("EU ESTOU RODANDO O ARQUIVO CERTO!");

import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
// Preciso achar o erro
app.use((req, res, next) => {
  console.log(`Recebi uma requisição: ${req.method} na rota ${req.url}`);
  next();
});

// Minha Rota de teste
app.get("/health", (req, res) => res.json({ ok: true }));

// 1. Vou Listar Usuários
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
});

// 2. Vou Criar Usuário
app.post("/users", async (req, res) => {
  const { email, name, age } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, name, age },
    });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao criar usuário" });
  }
});

// 3. Vou Editar Usuário
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email, name, age } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: id },
      data: { email, name, age },
    });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
});

// 4. Vou Deletar Usuário
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: id },
    });
    return res.status(200).json({ message: "Usuário deletado!" });
  } catch (err) {
    return res.status(400).json({ error: "Erro ao deletar usuário" });
  }
});

// Ligando o meu servidor
app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
