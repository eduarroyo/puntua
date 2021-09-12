const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://puntuausr:E170HEYCjEcgKQJL@puntua.ed4zx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function cargarListaAlumnos() {
    try {
        await client.connect();
        const database = client.db("puntua");
        const coleccionAlumnos = database.collection("alumnos");

        const filtro = {}; // Sin filtro. Por ahora queremos obtener todos los alumnos
        const opciones = { sort : { nombre: 1 }, projection: {_id: 0, nombre: 1 } } // Ordenar por nombre ascendente, obtener solo el campo nombre
        const cursor = await coleccionAlumnos.find(filtro, opciones);

        var alumnos = await cursor.toArray();
        return alumnos;
    } finally {
        await client.close();
    }
}

async function cargarAlumno(nombreAlumno) {
    
    try {
        await client.connect();
        const database = client.db("puntua");
        const coleccionAlumnos = database.collection("alumnos");

        const filtro = { nombre: nombreAlumno };
        const opciones = {projection: {_id: 0, nombre: 1, puntuacion: 1 }};
        const result = await coleccionAlumnos.findOne(filtro,opciones);

        return result;
    } finally {
        await client.close();
    }
}

async function puntuarAlumno(nombreAlumno, puntos) {
    try {
        await client.connect();
        const database = client.db("puntua");
        const coleccionAlumnos = database.collection("alumnos");

        const filtro = { nombre: nombreAlumno };
        const update = { $inc: { puntuacion: puntos} };
        const opciones = {upsert: false};
        const result = await coleccionAlumnos.updateOne(filtro, update, opciones);

        return result.matchedCount;
    
    } finally {
        await client.close();
    }
}

module.exports = {
    cargarListaAlumnos,
    cargarAlumno,
    puntuarAlumno
}