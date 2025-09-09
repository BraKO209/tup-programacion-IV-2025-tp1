// Importa Express
const express = require('express');
const app = express();
const port = 3000;

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Importa los routers de cada ejercicio
const rectangulosRouter = require('./ejercicio1/rectangulosRouter');
const alumnosRouter = require('./ejercicio2/alumnosRouter');
const tareasRouter = require('./ejercicio3/tareasRouter');

// Usa los routers para cada ruta base
app.use('/api/rectangulos', rectangulosRouter);
app.use('/api/alumnos', alumnosRouter);
app.use('/api/tareas', tareasRouter);

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});