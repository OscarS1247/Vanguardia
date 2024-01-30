var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(process.env.VITE_WEATHER_API);
  res.send('respond with a resources: ' + process.env.VITE_WEATHER_API);
});

module.exports = router;
