const express = require("express");
const app = express();

// informa que o corpo de requisição será em JSON
app.use(express.json());

const lista = ["Bulbasaur", "Charmander", "Squirtle"];

// [POST]      -> create
// [GET]       -> read
// [PUT/PATCH] -> update
// [DELETE]    -> delete

// [GET] -> Read All
app.get("/pokemons", (req, res) => {
  res.status(200).send(lista.filter(Boolean));
});

// [GET] -> Read Single (by id)
app.get("/pokemons/:id", (req, res) => {
  const id = req.params.id;

  const item = lista[id - 1];

  res.status(200).send(item);
});

// [POST] - Create
app.post("/pokemons", (req, res) => {
  const item = req.body.nome;

  lista.push(item);

  res.status(201).send("Criado com sucesso");
});

// [PUT] - Update
app.put("/pokemons/:id", (req, res) => {
  const id = req.params.id;
  const item = req.body.nome;
  lista[id - 1] = item;

  res.send("Item alterado com sucesso");
});

// [DELETE] - Delete
app.delete("/pokemons/:id", (req, res) => {
  const id = req.params.id;

  delete lista[id - 1];

  res.send("Item removido com sucesso");
});

app.listen(3000);
