const express = require('express');
const router = express.Router();

// Arreglo interno para guardar los cálculos
const calculosRectangulos = [];

// Ruta para crear un nuevo cálculo de rectángulo
router.post('/', (req, res) => {
    const { ancho, alto } = req.body;

    // Validación de valores
    if (!ancho || !alto || ancho <= 0 || alto <= 0) {
        return res.status(400).send('Ancho y alto deben ser valores numéricos positivos.');
    }

    // Calcula el perímetro y la superficie
    const perimetro = 2 * ancho + 2 * alto;
    const superficie = ancho * alto;

    // Guarda el cálculo en el arreglo
    const nuevoCalculo = { ancho, alto, perimetro, superficie };
    calculosRectangulos.push(nuevoCalculo);

    res.status(201).json(nuevoCalculo);
});

// Ruta para obtener todos los cálculos
router.get('/', (req, res) => {
    // Mapea el arreglo para añadir el tipo de figura (rectángulo o cuadrado)
    const resultados = calculosRectangulos.map(c => {
        const tipo = (c.ancho === c.alto) ? 'cuadrado' : 'rectangulo';
        // Devuelve un nuevo objeto sin modificar el original
        return { ...c, tipo };
    });

    res.json(resultados);
});

module.exports = router;