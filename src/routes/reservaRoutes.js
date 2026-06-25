const express = require('express');
const router = express.Router();

const ReservaController = require('../controllers/ReservaController');

router.post('/reservas', ReservaController.criar);
router.delete('/reservas/:id', ReservaController.cancelar);
router.get('/reservas', ReservaController.listar);
router.get('/reservas/:id', ReservaController.listarFiltradas);


module.exports = router;
