const express = require('express');
const router = express.Router();
const db = require('../config/database');

//Ejercicio 1 . Registrar nueva categoría
router.post('/categories', (req, res) => {
    const { nombre, descripcion } = req.body;
    
    console.log('Datos recibidos:', req.body); // Para debug
    
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es requerido' });
    }
    const descripcionValue = descripcion || null;

    const query = 'INSERT INTO categories (nombre, descripcion) VALUES (?, ?)';
    db.execute(query, [nombre, descripcionValue], (error, results) => {
        if (error) {
            console.error(' Error en la consulta:', error);
            return res.status(500).json({ error: 'Error al crear categoría' });
        }
        res.status(201).json({ 
            id: results.insertId, 
            nombre, 
            descripcion: descripcionValue,
            mensaje: 'Categoría creada exitosamente' 
        });
    });
});

//ejercicio2 . Obtener todas las categorías
router.get('/categories', (req, res) => {
    const query = 'SELECT * FROM categories ORDER BY fecha_alta DESC';
    db.execute(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener categorías' });
        }
        res.json(results);
    });
});

//ejercicio3 Obtener categoría por ID con sus productos
router.get('/categorias/:id', (req, res) => {
    const categoryId = req.params.id;
    
    const categoryQuery = 'SELECT * FROM categories WHERE id = ?';
    db.execute(categoryQuery, [categoryId], (error, categoryResults) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener categoría' });
        }
        
        if (categoryResults.length === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        const productsQuery = 'SELECT * FROM productos WHERE categoria_id = ?';
        db.execute(productsQuery, [categoryId], (error, productResults) => {
            if (error) {
                return res.status(500).json({ error: 'Error al obtener productos' });
            }

            const categoria = categoryResults[0];
            categoria.productos = productResults;
            
            res.json(categoria);
        });
    });
});

// ejercicio4 - Actualizar categoría
router.put('/categorias/:id', (req, res) => {
    const categoryId = req.params.id;
    const { nombre, descripcion } = req.body;
    
    console.log(' Datos para actualizar:', { categoryId, nombre, descripcion });
    
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const query = 'UPDATE categories SET nombre = ?, descripcion = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?';
    
    db.execute(query, [nombre, descripcion, categoryId], (error, results) => {
        if (error) {
            console.error(' Error al actualizar categoría:', error);
            return res.status(500).json({ error: 'Error al actualizar categoría' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json({ 
            mensaje: 'Categoría actualizada exitosamente',
            id: categoryId,
            cambios: {
                nombre,
                descripcion
            }
        });
    });
});

//ejercicio5 .  Eliminar categoría
router.delete('/categorias/:id', (req, res) => {
    const categoryId = req.params.id;

    const query = 'DELETE FROM categories WHERE id = ?';
    db.execute(query, [categoryId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar categoría' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json({ mensaje: 'Categoría y sus productos eliminados exitosamente' });
    });
});

module.exports = router;