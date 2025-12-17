import express from "express";

const app = express();

app.use(express.json());

//Rota GET (ler os dados)
app.get("/:jesus", (req, res) => {
  console.log(req);

  res.send("Hello World");
});
// navegador não consegue acessar rotas post, put e delete, somente GET

// Rota POST (cria os dados)
app.post("/", (req, res) => {
  console.log(req);

  res.send("Usuário criado com sucesso!");
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
