var express = require('express');
var router = express.Router();
var bd = require("../negocio/puntua-negocio.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Puntua' });
});

router.get('/alumnos', async (req, res, next) => {
  //var alumnos = bd.map(function(a) { return a.nombre; });
  var alumnos = await bd.cargarListaAlumnos();
  console.log("Lista alumnos: ", alumnos);
  res.json(alumnos);
});

router.get('/alumno', async (req, res, next) => {
  var nombreAlumno = req.query.a.trim().toLocaleLowerCase();
  //var alumno = bd.find(function(a) { return a.nombre.toLocaleLowerCase() === nombreAlumno});
  var alumno = await bd.cargarAlumno(nombreAlumno);
  console.log("Alumno encontrado: ", alumno);

  if(alumno) {
    res.json(alumno);
  } else {
    res.status(404).send({ error: "Alumno no encontrado."});
  }
});

router.get("/puntuar", async (req, res, next) => {
  var nombreAlumno = req.query.a.trim().toLocaleLowerCase();
  var puntos = parseInt(req.query.p);
  //var indiceAlumno = bd.findIndex(function(a) { return a.nombre.toLocaleLowerCase() === nombreAlumno});
  var resul = await bd.puntuarAlumno(nombreAlumno, puntos);
  if(resul === 0) {
    res.status(404).send({ error: "Alumno no encontrado."});
  } else {
    res.json(1);
  }
});

module.exports = router;
