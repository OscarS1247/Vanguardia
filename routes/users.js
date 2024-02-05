var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(process.env.VITE_WEATHER_API);
  res.send('respond with a resources: ' + process.env.VITE_WEATHER_API);
});

router.get('/db', function (req, res, next) {
  mongoose.connect(process.env.MONGODB_DATABASE).then(function (response) {
    res.send("Conectado a la base de datos correctamente")
  }).catch(function (error) {
    res.send("Error al conectar con la base de datos")
  })
});


module.exports = router;
