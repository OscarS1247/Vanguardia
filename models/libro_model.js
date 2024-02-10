const mongoose = require("mongoose");

const LibroSchema = new mongoose.Schema({
	id: [{
		type: Number,
		required: true,
		unique: true,
	}],
	nombre: [{
		type: String,
		required: true
	}],
	author: [{
		type: String,
	}],
	num_pag: [{
		type: Number,
	}],
	fecha_publi: [{
		type: Date,
	}],
	editorial: [{
		type: String,
	}],
	ISBN: [{
		unique: true,
		type: String,
	}],
	genero: [{
		type: String,
	}],
	comentario: [{
		type: String,
	}],
	edicion: [{
		type: Number,
	}],
	copias : [{
		type: Number,
	}],
});

const libro = mongoose.model("libros", LibroSchema);
module.exports = { libro };