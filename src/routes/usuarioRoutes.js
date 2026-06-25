const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

router.post('/usuarios', UsuarioController.criar);
router.get('/usuarios', UsuarioController.listar);
router.get('/usuarios/:id', UsuarioController.buscarPorId);
router.put('/usuarios/:id', UsuarioController.atualizar);
router.delete('/usuarios/:id', UsuarioController.deletar);


module.exports = router;