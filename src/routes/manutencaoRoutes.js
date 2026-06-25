const express = require("express");
const router = express.Router();

const ManutencaoController = require("../controllers/ManutencaoController");

router.post("/manutencoes", ManutencaoController.criar);
router.get("/manutencoes", ManutencaoController.listar);
router.put("/manutencoes/:id/status", ManutencaoController.atualizarStatus);

module.exports = router;