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

function puntuarAlumno(alumno, puntos, cb) {
    
}

function cargarCombo(err, alumnos) {
    if(err) {
        console.err(err);
        return;
    }

    var combo = document.querySelector('#lista-alumnos');
    
    for(var i = 0; i < alumnos.length; i++) {
        var el = document.createElement("option");
        el.textContent = alumnos[i];
        combo.appendChild(el);
    }
}

function mostrarDatosAlumno(err, alumno) {
    var bloquePuntuar = document.querySelector('#bloque-puntuacion');
    var spanPuntuacion = document.querySelector('#puntuacion');
    
    if(err) {
        console.err(err);
        bloquePuntuar.setAttribute("style", "display:none");
        return;
    }

    spanPuntuacion.textContent = alumno.puntuacion;
    bloquePuntuar.setAttribute("style", "display:block");
}

window.onload = function() {
    const selectAlumnos = document.querySelector('#lista-alumnos');

    selectAlumnos.addEventListener('change', (event) => {
        cargarDatosAlumno(event.target.value, mostrarDatosAlumno);
    });
    cargarAlumnos(cargarCombo);
};

