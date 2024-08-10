const db = require('../db');

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const [result] = await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
    res.status(201).json({ id: result.insertId, name, price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    await db.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id]);
    res.json({ id, name, price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
