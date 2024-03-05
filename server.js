const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let lista_produtos = {
  produtos: [
    {
      id: 1,
      descricao: "Arroz parboilizado 5Kg",
      valor: 25.0,
      marca: "Tio João",
    },
    { id: 2, descricao: "Maionese 250gr", valor: 7.2, marca: "Helmans" },
    { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.5, marca: "Itambé" },
    {
      id: 4,
      descricao: "Batata Maior Palha 300gr",
      valor: 15.2,
      marca: "Chipps",
    },
    { id: 5, descricao: "Nescau 400gr", valor: 8.0, marca: "Nestlé" },
  ],
  lastModified: new Date().toISOString(),
};

let cacheLastModified = lista_produtos.lastModified;

app.get("/produtos", (req, res) => {
  console.log("Acessando /produtos");
  const ifModifiedSince = req.headers["if-modified-since"];
  const lastModified = new Date(lista_produtos.lastModified).getTime();
  const ifModifiedSinceDate = ifModifiedSince
    ? new Date(ifModifiedSince).getTime()
    : null;

  console.log("If-Modified-Since (Header):", ifModifiedSince);
  console.log("Last Modified (Stored):", lista_produtos.lastModified);
  console.log("Comparing:", lastModified, "<=", ifModifiedSinceDate);

  if (ifModifiedSinceDate && lastModified <= ifModifiedSinceDate) {
    console.log("Not Modified");
    res.status(304).end();
  } else {
    console.log("Modified. Sending Data.");
    res.setHeader("Last-Modified", lista_produtos.lastModified);
    res.status(200).json(lista_produtos);
  }
});

app.get("/produtos/:id", (req, res) => {
  console.log("Acessando /produtos/:id");
  if (
    req.headers["if-modified-since"] &&
    new Date(req.headers["if-modified-since"]).getTime() >=
      new Date(cacheLastModified).getTime()
  ) {
    console.log("Not Modified /produtos/:id");
    return res.status(304).end();
  } else {
    const { id } = req.params;
    const produto = lista_produtos.produtos.find((p) => p.id === parseInt(id));
    if (produto) {
      console.log("Modified. Sending Data /produtos/:id");
      res.setHeader("Last-Modified", lista_produtos.lastModified);
      res.status(200).json(produto);
    } else {
      res.status(404).send("Produto não encontrado");
    }
  }
});

app.post("/produtos", (req, res) => {
  const { descricao, valor, marca } = req.body;
  const novoProduto = {
    id: lista_produtos.produtos.length + 1,
    descricao,
    valor,
    marca,
  };
  lista_produtos.produtos.push(novoProduto);
  lista_produtos.lastModified = new Date().toISOString();
  cacheLastModified = lista_produtos.lastModified;
  res.status(201).json(novoProduto);
});

app.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const index = lista_produtos.produtos.findIndex((p) => p.id === parseInt(id));
  if (index !== -1) {
    lista_produtos.produtos[index] = {
      ...lista_produtos.produtos[index],
      ...req.body,
    };
    lista_produtos.lastModified = new Date().toISOString();
    cacheLastModified = lista_produtos.lastModified;
    res.status(200).json(lista_produtos.produtos[index]);
  } else {
    res.status(404).send("Produto não encontrado");
  }
});

app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const index = lista_produtos.produtos.findIndex((p) => p.id === parseInt(id));
  if (index !== -1) {
    lista_produtos.produtos.splice(index, 1);
    lista_produtos.lastModified = new Date().toISOString();
    cacheLastModified = lista_produtos.lastModified;
    res.status(204).send();
  } else {
    res.status(404).send("Produto não encontrado");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
