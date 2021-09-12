// Carga la lista de alumnos
function cargarAlumnos(cb) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(callback) {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               cb(null, JSON.parse(xmlhttp.response));
           }
           else {
               cb('Error ' + xmlhttp.status);
           }
        }
    };

    xmlhttp.open("GET", "/alumnos", true);
    xmlhttp.send();
}

// Carga los datos de un alumno
function cargarDatosAlumno(alumno, cb) {
    console.log("Alumno seleccionado: " + alumno);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(callback) {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               cb(null, JSON.parse(xmlhttp.response));
           }
           else {
               cb('Error ' + xmlhttp.status);
           }
        }
    };

    xmlhttp.open("GET", "/alumno?a=" + alumno, true);
    xmlhttp.send();
}

// Puntuar a un alumno
function puntuarAlumno(alumno, puntos, cb) {
    console.log("Alumno: " + alumno + ", Puntuación: " + puntos);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(callback) {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               cb(null, JSON.parse(xmlhttp.response));
           }
           else {
               cb('Error ' + xmlhttp.status);
           }
        }
    };

    xmlhttp.open("GET", "/puntuar?a=" + alumno + "&p=" + puntos, true);
    xmlhttp.send();
}