import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// rota de teste
app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
});

app.post("/users", async (req, res) => {
  const { email, name, age } = req.body;

  try {
    const user = await prisma.user.create({
      data: { email, name, age },
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error("PRISMA ERROR:", err);
    return res.status(400).json({
      error: "Erro ao criar o usuário.",
      details: err.message,
      code: err.code,
    });
  }
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
