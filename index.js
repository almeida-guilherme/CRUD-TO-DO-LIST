const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = require("./routes/routes")

const app = express();
const port = 3000

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")))

app.use(router)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
