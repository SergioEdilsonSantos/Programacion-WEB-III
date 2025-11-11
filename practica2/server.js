const express = require('express');
const cors = require('cors');
require('dotenv').config();

const categoriesRoutes = require('./routes/categories');
const productosRoutes = require('./routes/productos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', categoriesRoutes);
app.use('/api', productosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'API de Práctica 2 - Programación Web 3',
        endpoints: {
            categorias: {
                'POST /api/categories': 'Crear categoría',
                'GET /api/categories': 'Obtener todas las categorías',
                'GET /api/categorias/:id': 'Obtener categoría con productos',
                'PUT /api/categorias/:id': 'Actualizar categoría',
                'DELETE /api/categorias/:id': 'Eliminar categoría'
            },
            productos: {
                'POST /api/productos': 'Crear producto',
                'GET /api/productos': 'Obtener todos los productos',
                'GET /api/productos/:id': 'Obtener producto por ID',
                'PUT /api/productos/:id': 'Actualizar producto',
                'PATCH /api/productos/:id/stock': 'Actualizar stock'
            }
        }
    });
});

app.use((req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        mensaje: `La ruta ${req.method} ${req.originalUrl} no existe`
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});