const mongoose = require('mongoose');
const libroModel = require("../models/libro_model");

//Conectar con la base de datos de Mongo
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_DATABASE_URL);
        console.log("Conexion establecida con Exito!");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

// Agregar un nuevo libro
async function crear_libro(req, res) {
    await connect();
    const nuevo_libro = new libroModel.libro(req.body);
    try {
        await nuevo_libro.save();
        res.send({ message: "Libro Creado con Exito!", status: "200" });
    } catch (err) {
        res.status(500).send({ message: ("Internal server error: " + err), status: "500" });
    }
}

// Remover un libro
async function remover_libro(req, res) {
    await connect();
    try {
        await libroModel.libro.deleteOne({ id: req.params.id });
        res.send({ message: "Libro Removido con Exito!", status: "200" });
    } catch (err) {
        res.status(500).send({ message: ("Internal server error: " + err), status: "500" });
    }
}

// Actualizar un libro
async function actualizar_libro(req, res) {
    await connect();
    try {
        await libroModel.libro.updateOne({ id: req.params.id }, req.body);
        res.send({ message: "Libro Actualizado con Exito!", status: "200" });
    } catch (err) {
        res.status(500).send({ message: ("Internal server error: " + err), status: "500" });
    }
}

// Obtener todos los libros
async function obtener_libros(req, res) {
    await connect();
    try {
        const libros = await libroModel.libro.find();
        res.send(libros);
    } catch (err) {
        res.status(500).send({ message: ("Internal server error: " + err), status: "500" });
    }
}

// Obtener un libro por id
async function obtener_libro_id(req, res) {
    await connect();
    try {
        const libro = await libroModel.libro.findOne({ id: req.params.id });
        res.send(libro);
    } catch (err) {
        res.status(500).send({ message: ("Internal server error: " + err), status: "500" });
    }
}


module.exports = {
    crear_libro,
    remover_libro,
    actualizar_libro,
    obtener_libros,
    obtener_libro_id
}
