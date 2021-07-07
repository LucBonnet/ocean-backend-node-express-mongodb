const express = require("express");
const app = express();

const lista = ["Bulbasaur", "Charmander", "Squirtle"];

// [POST]      -> create
// [GET]       -> read
// [PUT/PATCH] -> update
// [DELETE]    -> delete

// [GET] -> Read All
app.get("/pokemons", (req, res) => {
  res.send(lista);
});

// [GET] -> Read Single (by id)
app.get("/pokemons/:id", (req, res) => {
  const id = req.params.id;

  const item = lista[id - 1];

  res.send(item);
});

app.post("/pokemons", (req, res) => {
  lista.push();
});

app.listen(3000);
