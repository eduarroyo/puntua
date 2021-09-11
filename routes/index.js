var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Puntua' });
});

router.get('/alumnos', function(req, res, next) {
  var alumnos = bd.map(function(a) { return a.nombre; });
  res.json(alumnos);
});

router.get('/alumno', function(req, res, next) {
  var nombreAlumno = req.query.a.trim().toLocaleLowerCase();
  var alumno = bd.find(function(a) { return a.nombre.toLocaleLowerCase() === nombreAlumno});

  console.log(alumno);

  if(alumno) {
    res.json(alumno);
  } else {
    res.status(404).send({ error: "Alumno no encontrado."});
  }
});

router.post("puntuar", function(req, res, next) {
  var nombreAlumno = req.query.alumno.trim().toLocaleLowerCase();
  var alumno = bd.find(function(a) { return a.nombre.toLocaleLowerCase() === nombreAlumno});

  if(alumno) {
    db[alumno].puntuacion += req.query.pun;
    res.json(alumno);
  } else {
    res.status(404).send({ error: "Alumno no encontrado."});
  }
});

var bd = [
  {nombre: 'pepe', puntuacion:0.0},
  {nombre: 'maría', puntuacion:0.0},
  {nombre: 'juan', puntuacion:0.0},
  {nombre: 'laura', puntuacion:0.0},
  {nombre: 'ana', puntuacion:0.0},
  {nombre: 'josé', puntuacion:0.0},
  {nombre: 'miguel', puntuacion:0.0},
  {nombre: 'lucía', puntuacion:0.0},
  {nombre: 'francisco', puntuacion:0.0}
];

module.exports = router;
