var express = require("express");
var router = express.Router();
const estantesController = require("../controllers/estantes_controller");

//POST
router.post("/crear", estantesController.crear_estante);

//GET
router.get("/obtener_todos", estantesController.obtener_estantes);
router.get("/obtener_estante/:id", estantesController.obtener_estante_id);

//DELETE
router.delete("/remover_estante/:id", estantesController.remover_estante);

//PUT
router.put("/actualizar_estante/:id", estantesController.actualizar_estante);

module.exports = router;