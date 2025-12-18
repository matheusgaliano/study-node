import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

//Rota GET (ler os dados)
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  console.log(req);

  res.status(200).json(users);
});
// navegador não consegue acessar rotas post, put e delete, somente GET

// Rota POST (cria os dados)
app.post("/users", async (req, res) => {
  const { email, name, age } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        age,
      },
    });

    res.status(201).json({ message: "Usuário criado com sucesso!!!!" });
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar o usuário." });
  }

  app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
  });
});
