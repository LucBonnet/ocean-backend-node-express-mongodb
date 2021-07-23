require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

(async () => {
  const url = process.env.DB_URL;
  const dbName = "pokemons";

  console.info("Conectando ao banco de dados");

  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  console.info("MongoDB conectado com sucesso");

  const db = client.db(dbName);

  const app = express();
  // informa que o corpo de requisição será em JSON
  app.use(express.json());

  // const lista = ["Bulbasaur", "Charmander", "Squirtle"];

  const pokemons = db.collection("pokemons");

  // CORS
  app.all("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Methods", "*");

    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
    );

    next();
  });

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
    const id = req.body.id;
    const nome = req.body.nome;
    const imagemUrl = req.body.imagemUrl;

    // lista.push(item);
    await pokemons.insertOne({ id: id, nome: nome, imagemUrl: imagemUrl });

    res.status(201).send("Criado com sucesso");
  });

  // [PUT] - Update
  app.put("/pokemons/:id", async (req, res) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const imagemUrl = req.body.imagemUrl;

    // lista[id - 1] = item;
    await pokemons.updateOne(
      { id: id },
      { $set: { nome: nome, imagemUrl: imagemUrl } }
    );

    res.send("Item alterado com sucesso");
  });

  // [DELETE] - Delete
  app.delete("/pokemons/:id", async (req, res) => {
    const id = req.params.id;

    // delete lista[id - 1];
    await pokemons.deleteOne({ id: id });

    res.send("Item removido com sucesso");
  });

  app.listen(3300);
})();
