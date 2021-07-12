require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

(async () => {
  const url = process.env.DB_URL;
  const dbName = "ocean";

  console.info("Conectando ao banco de dados");

  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  console.info("MongoDB conectado com sucesso");

  const db = client.db(dbName);

  const app = express();
  // informa que o corpo de requisição será em JSON
  app.use(express.json());

  // const lista = ["Bulbasaur", "Charmander", "Squirtle"];

  const pokemons = db.collection("pokemons");

  // [POST]      -> create
  // [GET]       -> read
  // [PUT/PATCH] -> update
  // [DELETE]    -> delete

  // [GET] -> Read All
  app.get("/pokemons", async (req, res) => {
    const listaPokemons = await pokemons.find().toArray();

    // res.status(200).send(lista.filter(Boolean));
    res.status(200).send(listaPokemons);
  });

  // [GET] -> Read Single (by id)
  app.get("/pokemons/:id", async (req, res) => {
    const id = req.params.id;

    // const item = lista[id - 1];
    const item = await pokemons.findOne({ _id: ObjectId(id) });

    res.status(200).send(item);
  });

  // [POST] - Create
  app.post("/pokemons", async (req, res) => {
    const item = req.body.nome;

    // lista.push(item);
    await pokemon.insertOne(item);

    res.status(201).send("Criado com sucesso");
  });

  // [PUT] - Update
  app.put("/pokemons/:id", async (req, res) => {
    const id = req.params.id;
    const item = req.body.nome;

    // lista[id - 1] = item;
    await pokemons.updateOne({ _id: ObjectId(id) }, { $set: item });

    res.send("Item alterado com sucesso");
  });

  // [DELETE] - Delete
  app.delete("/pokemons/:id", async (req, res) => {
    const id = req.params.id;

    // delete lista[id - 1];
    await pokemons.deleteOne({ _id: ObjectId(id) });

    res.send("Item removido com sucesso");
  });

  app.listen(3000);
})();
