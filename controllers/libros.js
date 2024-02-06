const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const port = 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_DATABASE, 
    { useNewUrlParser: true, useUnifiedTopology: true });

// Definición del modelo de libro
const Libro = mongoose.model('Libro', {
  id: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  author: {
    type: String,
  },
  num_pag: {
    type: Number,
  },
  fecha_publi: {
    type: Date,
  },
  editorial: {
    type: String,
  },
  ISBN: {
    type: String,
  },
  genero: {
    type: String,
  },
  comentario: {
    type: String,
  },
  edicion: {
    type: Number,
  },
});


// Agregar un nuevo libro
const create_book = async (req, res) => {
  try {
    const { id, nombre, author, num_pag, fecha_publi,editorial, ISBN, genero, comentario, edicion } = req.body;
    const nuevoLibro = new Libro({ id, nombre, author, num_pag, fecha_publi,editorial, ISBN, genero, comentario, edicion });
    mongoose.create (nuevoLibro);
    res.json(nuevoLibro);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

model.exports = {
    create_book,
    
}
