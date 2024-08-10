const express = require('express');
const app = express();
const connectDB = require('./db'); // No es necesario conectar a la base de datos en MySQL de esta forma

app.use(express.json());

// Importar y usar las rutas
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
