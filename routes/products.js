const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Obtener todos los productos
router.get('/products', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un nuevo producto
router.post('/products', async (req, res) => {
    const { name, price, quantity } = req.body;
    try {
        const [result] = await db.query('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)', [name, price, quantity]);
        res.status(201).json({ id: result.insertId, name, price, quantity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Modificar un producto existente
router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    try {
        await db.query('UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?', [name, price, quantity, id]);
        res.status(200).json({ message: 'Producto actualizado con éxito' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Borrar un producto
router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM products WHERE id = ?', [id]);
        res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
