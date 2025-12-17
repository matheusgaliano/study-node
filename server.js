import express from "express";

const app = express();

app.use(express.json());

const users = [];

//Rota GET (ler os dados)
app.get("", (req, res) => {
  console.log(req);

  res.status(200).json(users);
});
// navegador não consegue acessar rotas post, put e delete, somente GET

// Rota POST (cria os dados)
app.post("/", (req, res) => {
  users.push(req.body);

  res.status(201).json({ message: "Usuário criado com sucesso!!!!" });
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
