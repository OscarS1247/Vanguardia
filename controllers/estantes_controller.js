const mongoose = require('mongoose');
const estanteModel = require("../models/estante_model");

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

// Agregar un nuevo estante
async function crear_estante(req, res) {
    connect();
    const nuevo_estante = new estanteModel.estante(req.body);
    try {
        await nuevo_estante.save();
        res.send({ message: "Estante Creado con Exito!", status: "200" });
    } catch (err) {
        res.status(500).send({ message: "Internal server error", status: "500" });
    }
}

// Remover un estante
async function remover_estante(req, res) {
    connect();
    try {
        await estanteModel.estante.deleteOne({ id: req.params.id });
        res.send({ message: "Estante Removido con Exito!", status: "200" });
    } catch (err) {
        res.status(500).send({ message: "Internal server error", status: "500" });
    }
}

// Actualizar un estante
async function actualizar_estante(req, res) {
    connect();
    try {
        await estanteModel.estante.updateOne({ id: req.params.id }, req.body);
        res.send({ message: "Estante Actualizado con Exito!", status: "200" });
    } catch (err) {
        res.status(500).send({ message: "Internal server error", status: "500" });
    }
}

// Obtener todos los estantes
async function obtener_estantes(req, res) {
    connect();
    try {
        const estantes = await estanteModel.estante.find();
        res.send(estantes);
    } catch (err) {
        res.status(500).send({ message: "Internal server error", status: "500" });
    }
}

// Obtener un estante por id
async function obtener_estante_id(req, res) {
    connect();
    try {
        const estante = await estanteModel.estante.findOne({ id: req.params.id });
        res.send(estante);
    } catch (err) {
        res.status(500).send({ message: "Internal server error", status: "500" });
    }
}

module.exports = {
    crear_estante,
    remover_estante,
    actualizar_estante,
    obtener_estantes,
    obtener_estante_id
}
