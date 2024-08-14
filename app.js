const express = require('express');
const app = express();
const productRoutes = require('./routes/products');

app.use(express.json());

// Usar las rutas de productos
app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
