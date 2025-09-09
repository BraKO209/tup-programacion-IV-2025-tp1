const express = require('express');
const router = express.Router();

// Arreglo interno para guardar las tareas
const tareas = [];

// Ruta para crear una nueva tarea
router.post('/', (req, res) => {
    const { nombre } = req.body;

    // Validación: que no se repitan los nombres
    const tareaExistente = tareas.find(t => t.nombre.toLowerCase() === nombre.toLowerCase());
    if (tareaExistente) {
        return res.status(409).send('La tarea con ese nombre ya existe.');
    }

    // Por defecto, la tarea se crea como no completada
    tareas.push({ nombre, completada: false });
    res.status(201).send('Tarea agregada exitosamente.');
});

// Ruta para obtener tareas con un filtro opcional
router.get('/', (req, res) => {
    const filtro = req.query.filtro;

    let resultados = tareas;

    if (filtro === 'completadas') {
        resultados = tareas.filter(t => t.completada);
    } else if (filtro === 'sin-completar') {
        resultados = tareas.filter(t => !t.completada);
    }

    res.json(resultados);
});

// Puedes agregar una ruta PUT para marcar una tarea como completada
router.put('/:nombre', (req, res) => {
    const nombreTarea = req.params.nombre;
    const { completada } = req.body;

    const tarea = tareas.find(t => t.nombre.toLowerCase() === nombreTarea.toLowerCase());

    if (!tarea) {
        return res.status(404).send('Tarea no encontrada.');
    }

    // Actualiza el estado de la tarea
    tarea.completada = completada;
    res.status(200).send('Tarea actualizada.');
});

module.exports = router;