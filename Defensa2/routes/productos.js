const express = require('express');
const router = express.Router();
const db = require('../config/database');

// ejercicio6 - Registrar nuevo producto
router.post('/productos', (req, res) => {
    const { nombre, precio, stock, categoria_id } = req.body;
    
    if (!nombre || !precio || !stock || !categoria_id) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const query = 'INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)';
    db.execute(query, [nombre, precio, stock, categoria_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al crear producto' });
        }
        res.status(201).json({ 
            id: results.insertId, 
            nombre, 
            precio, 
            stock, 
            categoria_id,
            mensaje: 'Producto creado exitosamente' 
        });
    });
});

// ejercicio 7 - Obtener todos los productos con nombre de categoría
router.get('/productos', (req, res) => {
    const query = `
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p 
        INNER JOIN categories c ON p.categoria_id = c.id 
        ORDER BY p.fecha_alta DESC
    `;
    
    db.execute(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

// ejercicio8 - Obtener producto por ID con nombre de categoría
router.get('/productos/:id', (req, res) => {
    const productId = req.params.id;
    
    const query = `
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p 
        INNER JOIN categories c ON p.categoria_id = c.id 
        WHERE p.id = ?
    `;
    
    db.execute(query, [productId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener producto' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(results[0]);
    });
});

// ejercicio 9 - Actualizar producto
router.put('/productos/:id', (req, res) => {
    const productId = req.params.id;
    const { nombre, precio, stock, categoria_id } = req.body;
    
    if (!nombre || !precio || !stock || !categoria_id) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const query = 'UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?';
    db.execute(query, [nombre, precio, stock, categoria_id, productId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al actualizar producto' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto actualizado exitosamente' });
    });
});

//ejercicio10 - Actualizar stock
router.patch('/productos/:id/stock', (req, res) => {
    const productId = req.params.id;
    const { cantidad } = req.body;
    console.log('Actualizando stock del producto ID:', productId);
    console.log('Cantidad recibida:', cantidad);
    if (cantidad === undefined || cantidad === null) {
        return res.status(400).json({ error: 'La cantidad es requerida' });
    }
    if (isNaN(cantidad)) {
        return res.status(400).json({ error: 'La cantidad debe ser un número' });
    }
    const query = 'UPDATE productos SET stock = stock + ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?';
    db.execute(query, [cantidad, productId], (error, results) => {
        if (error) {
            console.error('Error al actualizar stock:', error);
            return res.status(500).json({ error: 'Error al actualizar stock' });
        } 
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const stockQuery = 'SELECT stock FROM productos WHERE id = ?';
        db.execute(stockQuery, [productId], (stockError, stockResults) => {
            if (stockError) {
                res.json({ 
                    mensaje: `Stock actualizado exitosamente (${cantidad > 0 ? '+' : ''}${cantidad})`,
                    id: productId,
                    cantidad_cambiada: cantidad
                });
            } else {
                res.json({ 
                    mensaje: `Stock actualizado exitosamente (${cantidad > 0 ? '+' : ''}${cantidad})`,
                    id: productId,
                    cantidad_cambiada: cantidad,
                    nuevo_stock: stockResults[0].stock
                });
            }
        });
    });
});
module. exports = router;