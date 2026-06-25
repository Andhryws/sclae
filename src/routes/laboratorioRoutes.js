const express = require('express');
const router = express.Router();

const LaboratorioController = require('../controllers/LaboratorioController');

router.post('/laboratorios', LaboratorioController.criar);
router.get('/laboratorios', LaboratorioController.listar);
router.get('/laboratorios/:id', LaboratorioController.buscarPorId);
router.put('/laboratorios/:id', LaboratorioController.atualizar);
router.delete('/laboratorios/:id', LaboratorioController.deletar);

module.exports = router;
