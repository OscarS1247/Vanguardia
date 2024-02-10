var express = require("express");
var router = express.Router();
const estantesController = require("../controllers/estantes_controller");

//POST
router.post("/crear", estantesController.crear_estante);
router.post("/agregar_libro", estantesController.agregarLibroAEstante);

//GET
router.get("/obtener_todos", estantesController.obtener_estantes);
router.get("/obtener_estante/:id", estantesController.obtener_estante_id);
router.get("/obtener_libros/:id", estantesController.cargarLibrosDeEstante);

//DELETE
router.delete("/remover_estante/:id", estantesController.remover_estante);
router.delete("/remover_libro", estantesController.eliminarLibroDeEstante);

//PUT
router.put("/actualizar_estante/:id", estantesController.actualizar_estante);
router.put("/mover_libro/", estantesController.cambiarLibroDeEstante);


module.exports = router;