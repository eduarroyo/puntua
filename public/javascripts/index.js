// Rellena el combo de alumnos. Si err!=null muestra el error por consola.
function cargarCombo(err, alumnos) {
    var el, combo, i;

    if(err) {
        console.error(err);
        return;
    }

    combo = document.querySelector('#lista-alumnos');

    el = document.createElement("option");
    el.textContent = "Selecciona un alumno";
    el.value="";
    combo.appendChild(el);
    
    for(i = 0; i < alumnos.length; i++) {
        el = document.createElement("option");
        el.textContent = alumnos[i].nombre;
        combo.appendChild(el);
    }
}

// Muestra los datos de un alumno en la interfaz. Si err!=null muestra el error por consola.
function mostrarDatosAlumno(err, alumno) {
    var bloquePuntuar = document.querySelector('#bloque-puntuacion');
    var spanPuntuacion = document.querySelector('#puntuacion');
    
    if(err) {
        console.error(err);
        bloquePuntuar.setAttribute("style", "display:none");
        return;
    }

    spanPuntuacion.textContent = alumno.puntuacion;
    bloquePuntuar.setAttribute("style", "display:block");
}

// Devuelve el nombre del alumno seleccionado en la lista.
function alumnoSeleccionado() {
    const selectAlumnos = document.querySelector('#lista-alumnos');
    return selectAlumnos.value;
}

// Evento ONLOAD: se ejecuta cuando se carga la página.
// en esta función se enlazan los eventos de la interfaz con las funciones que se deben ejecutar cuando estos se disparan.
window.onload = function() {
    var bt;
    const selectAlumnos = document.querySelector('#lista-alumnos');

    // Evento de cambio de selección de la lista desplegable de alumnos.
    // Al cambiar de alumno seleccionado se llama a la función cargarDatosAlumno que solicita al servidor los datos del alumno
    // y cuando recibe la respuesta, llama a mostrarDatosAlumno (función callback), encargada de actualizar la interfaz con
    // los datos recibidos.
    selectAlumnos.addEventListener('change', function(event) {
        if(event.target.value.length > 0) {
            cargarDatosAlumno(event.target.value, mostrarDatosAlumno);
        } else {
            var bloquePuntuar = document.querySelector('#bloque-puntuacion');
            bloquePuntuar.setAttribute("style", "display:none");
        }
    });

    // Eventos de click de los botones de puntuación
    // Cuando se pulsa un botón se llama a puntuarAlumno pasando el nombre del alumno seleccionado y la puntuación (definida en el atributo html "puntos" del botón).
    // Esta función solicita al servidor la operación correspondiente y cuando recibe la respuesta, llama a la función mostrarDatosAlumno, que refresca la interfaz.
    const botonesPuntuar = document.querySelector('#botones-puntuar').getElementsByTagName('input');
    for(var i = 0; i < botonesPuntuar.length; i++) {
        bt = botonesPuntuar[i];
        bt.addEventListener("click", function(event) {
            var alumno = alumnoSeleccionado();
            puntuarAlumno(alumno, event.target.attributes["puntos"].value, function() {
                cargarDatosAlumno(alumno, mostrarDatosAlumno); 
            });
        });
    };
    
    // Una vez configurados todos los eventos, llamamos a cargarAlumnos que solicita al servidor la lista de alumnos y una vez recibida,
    // a cargarCombo que se encarga de actualizar la interfaz.
    cargarAlumnos(cargarCombo);
};

