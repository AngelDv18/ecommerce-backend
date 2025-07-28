// Dependencias
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // 👈 nuevo
require('dotenv').config();
const sequelize = require('./config/database');

// Rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');



// Inicializar app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // 👈 tu frontend
  credentials: true                // 👈 para permitir cookies
}));
app.use(express.json());
app.use(cookieParser()); // 👈 necesario para leer cookies

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.use('/api/user', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('E-commerce backend funcionando');
});

// Conexión a la DB y arranque
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    sequelize.authenticate()
  .then(() => console.log('🟢 Conectado a Supabase!'))
  .catch(err => console.error('❌ Error al conectar con Supabase:', err));
  });
});

module.exports = app;
