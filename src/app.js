const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("./routes/usuarioRoutes");
const laboratorioRoutes = require("./routes/laboratorioRoutes");
const equipamentoRoutes = require("./routes/equipamentoRoutes");
const reservaRoutes = require("./routes/reservaRoutes");
const manutencaoRoutes = require("./routes/manutencaoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(usuarioRoutes);
app.use(laboratorioRoutes);
app.use(equipamentoRoutes);
app.use(reservaRoutes);
app.use(manutencaoRoutes);

//ROTAS
app.get("/", (req, res) => {
    res.json({ message: "API SCLAE funcionando" });
});

module.exports = app;