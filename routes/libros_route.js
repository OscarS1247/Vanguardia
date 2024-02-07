var express = require("express");
var router = express.Router();
const librosController = require("../controllers/libros_controller");

//POST
router.post("/crear", librosController.crear_libro);

//GET
router.get("/obtener_todos", librosController.obtener_libros);
router.get("/obtener_libro/:id", librosController.obtener_libro_id);

//DELETE
router.delete("/remover_libro/:id", librosController.remover_libro);

//PUT
router.put("/actualizar_libro/:id", librosController.actualizar_libro);

module.exports = router;