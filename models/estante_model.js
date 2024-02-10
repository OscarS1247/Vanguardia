const mongoose = require("mongoose");

const estanteSchema = new mongoose.Schema({
    id: [{
        type: Number,
        required: true
    }],
    posicion: [{
        type: String,
        required: true
    }],
    categoria: [{
        type: String,
        required: true
    }],
    libros: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'libros',
        required: true
    }],
});

const estante = mongoose.model("estantes", estanteSchema);
module.exports = { estante };