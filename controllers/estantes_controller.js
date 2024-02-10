const mongoose = require('mongoose');
const estanteModel = require("../models/estante_model");
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

// Agregar un nuevo estante
async function crear_estante(req, res) {
    await connect();
    const nuevo_estante = new estanteModel.estante(req.body);
    try {
        await nuevo_estante.save();
        res.send({ message: "Estante Creado con Exito!", status: "200" });
    } catch (err) {
        res.status(500).send({ message: ("Internal server error: " + err), status: "500" });
    }
}

// Remover un estante
async function remover_estante(req, res) {
    await connect();
    try {
        await estanteModel.estante.deleteOne({ id: req.params.id });
        res.send({ message: "Estante Removido con Exito!", status: "200" });
    } catch (err) {
        res.status(500).send({ message: ("Internal server error: " + err), status: "500" });
    }
}

// Actualizar un estante
async function actualizar_estante(req, res) {
    await connect();
    try {
        await estanteModel.estante.updateOne({ id: req.params.id }, req.body);
        res.send({ message: "Estante Actualizado con Exito!", status: "200" });
    } catch (err) {
        res.status(500).send({ message: ("Internal server error: " + err), status: "500" });
    }
}

// Obtener todos los estantes
async function obtener_estantes(req, res) {
    await connect();
    try {
        const estantes = await estanteModel.estante.find();
        res.send(estantes);
    } catch (err) {
        res.status(500).send({ message: ("Internal server error: " + err), status: "500" });
    }
}

// Obtener un estante por id
async function obtener_estante_id(req, res) {
    await connect();
    try {
        const estante = await estanteModel.estante.findOne({ id: req.params.id });
        res.send(estante);
    } catch (err) {
        res.status(500).send({ message: ("Internal server error: " + err), status: "500" });
    }
}

// Agregar Libro a Estante
async function agregarLibroAEstante(req, res) {
    await connect();
    try {
        const estanteExistente = await estanteModel.estante.findOne({ id: req.body.idEstante });
        if (!estanteExistente) 
            return res.status(404).send({ message: 'Estante no encontrado', status: 404 });
    
        const libroExistente = await libroModel.libro.findOne({ id: req.body.idLibro });

        if (!libroExistente) 
            return res.status(404).send({ message: 'Libro no encontrado', status: 404 });

        if (estanteExistente.libros.includes(req.body.idLibro)) 
            return res.status(400).send({ message: 'El libro ya está en el estante', status: 400 });

        estanteExistente.libros.push(libroExistente._id);
        await estanteExistente.save();
        res.status(200).send({ message: 'Libro agregado al estante existente con éxito', status: 200 });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: `Error interno del servidor:  ${ error}`, status: 500 });
    }
}

async function cargarLibrosDeEstante(req, res) {
    await connect();
    try {
        console.log("Id de Estanteria: " + req.params.id);
        const estanteConLibros = await estanteModel.estante.findOne({ id: req.params.id }).populate('libros').exec();
        if (!estanteConLibros) {
            return res.status(404).send({ message: "Estante no encontrado", status: 404 });
        }

        const librosDetallados = await Promise.all(estanteConLibros.libros.map(async (libroId) => {
            const libroDetallado = await libroModel.libro.findById(libroId);
            return libroDetallado;
        }));

        estanteConLibros.libros = librosDetallados;
        res.status(200).send(estanteConLibros);
    } catch (error) {
        console.error(`Error interno del servidor: ${error}`);
        res.status(500).send({ message: `Error interno del servidor: ${error}`, status: 500 });
    }
}


// Cambiar libro de estante
async function cambiarLibroDeEstante(req, res) {
    await connect();
    try {
        const { idEstanteActual, idEstanteNuevo, idLibro } = req.params;

        const estanteActual = await estanteModel.estante.findById(idEstanteActual);
        const estanteNuevo = await estanteModel.estante.findById(idEstanteNuevo);

        if (!estanteActual || !estanteNuevo)
            return res.status(404).send({ message: "Uno de los estantes no fue encontrado", status: 404 });

        const libroEncontrado = await libroModel.libro.findById(idLibro);

        if (!libroEncontrado)
            return res.status(404).send({ message: "Libro no encontrado", status: 404 });

        estanteActual.libros = estanteActual.libros.filter(libroId => libroId.toString() !== idLibro);
        estanteNuevo.libros.push(libroEncontrado._id);
        await estanteActual.save();
        await estanteNuevo.save();

        res.status(200).send({ message: "Libro cambiado de estante con éxito", status: 200 });
    } catch (error) {
        res.status(500).send({ message: `Error interno del servidor: ${error}`, status: 500 });
    }
}

// Eliminar libro de estante
async function eliminarLibroDeEstante(req, res) {
    await connect();
    try {
        const { idEstante, idLibro } = req.params;

        const estanteEncontrado = await estanteModel.estante.findById(idEstante);

        if (!estanteEncontrado) {
            return res.status(404).send({ message: "Estante no encontrado", status: 404 });
        }
        estanteEncontrado.libros = estanteEncontrado.libros.filter(libroId => libroId.toString() !== idLibro);
        await estanteEncontrado.save();

        res.status(200).send({ message: "Libro eliminado del estante con éxito", status: 200 });
    } catch (error) {
        res.status(500).send({ message: `Error interno del servidor: ${error}`, status: 500 });
    }
}

module.exports = {
    crear_estante,
    remover_estante,
    actualizar_estante,
    obtener_estantes,
    obtener_estante_id,
    agregarLibroAEstante,
    cargarLibrosDeEstante,
    cambiarLibroDeEstante,
    eliminarLibroDeEstante
}
