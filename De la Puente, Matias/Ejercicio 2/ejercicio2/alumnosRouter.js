const express = require('express');
const router = express.Router();

// Arreglo interno para guardar los alumnos
const alumnos = [];

// Ruta para agregar un nuevo alumno
router.post('/', (req, res) => {
    const { nombre, notas } = req.body;

    // Validación: que no se repitan los nombres
    const alumnoExistente = alumnos.find(a => a.nombre.toLowerCase() === nombre.toLowerCase());
    if (alumnoExistente) {
        return res.status(409).send('El alumno con ese nombre ya existe.');
    }

    // Validación de notas (opcional pero recomendable)
    if (!Array.isArray(notas) || notas.length !== 3) {
        return res.status(400).send('Se requieren exactamente 3 notas en un arreglo.');
    }

    alumnos.push({ nombre, notas });
    res.status(201).send('Alumno agregado exitosamente.');
});

// Ruta para consultar por un alumno
router.get('/:nombre', (req, res) => {
    const nombreAlumno = req.params.nombre;
    const alumno = alumnos.find(a => a.nombre.toLowerCase() === nombreAlumno.toLowerCase());

    if (!alumno) {
        return res.status(404).send('Alumno no encontrado.');
    }

    // Calcula el promedio
    const sumaNotas = alumno.notas.reduce((acc, nota) => acc + nota, 0);
    const promedio = sumaNotas / alumno.notas.length;

    // Determina el estado del alumno
    let estado;
    if (promedio < 6) {
        estado = 'reprobado';
    } else if (promedio >= 8) {
        estado = 'promocionado';
    } else {
        estado = 'aprobado';
    }

    res.json({
        nombre: alumno.nombre,
        notas: alumno.notas,
        promedio: promedio.toFixed(2), // Muestra 2 decimales
        estado // No se guarda en el arreglo
    });
});

// Ruta para modificar las notas de un alumno
router.put('/:nombre', (req, res) => {
    const nombreAlumno = req.params.nombre;
    const { notas } = req.body;

    const alumno = alumnos.find(a => a.nombre.toLowerCase() === nombreAlumno.toLowerCase());

    if (!alumno) {
        return res.status(404).send('Alumno no encontrado.');
    }
    
    // Validación de notas
    if (!Array.isArray(notas) || notas.length !== 3) {
        return res.status(400).send('Se requieren exactamente 3 notas en un arreglo.');
    }

    alumno.notas = notas; // Actualiza las notas
    res.status(200).send('Notas actualizadas exitosamente.');
});

module.exports = router;