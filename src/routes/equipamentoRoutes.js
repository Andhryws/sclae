const express = require("express");
const router = express.Router();

const EquipamentoController = require("../controllers/EquipamentoController");

router.post("/equipamentos", EquipamentoController.criar);
router.put("/equipamentos/:id", EquipamentoController.atualizar);
router.get("/equipamentos", EquipamentoController.listar);

module.exports = router;