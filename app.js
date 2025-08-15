// Dependencias
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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

// Confiar en proxy (Railway/Heroku) para que las cookies `Secure` funcionen
app.set('trust proxy', 1);

// ===== CORS =====
// Orígenes estáticos permitidos (dev + prod + main preview estable)
const staticAllow = new Set([
  'http://localhost:5173',
  'https://ecommerce-front-end-angeldv18s-projects.vercel.app',        // prod
  'https://ecommerce-front-end-git-main-angeldv18s-projects.vercel.app' // main preview
]);

// Regex para permitir SOLO previews de ESTE proyecto en Vercel
const vercelPreviewRe = /^https:\/\/ecommerce-front-[a-z0-9-]+-angeldv18s-projects\.vercel\.app$/;

// Bloque CORS principal
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // Postman/CLI
    if (staticAllow.has(origin) || vercelPreviewRe.test(origin)) {
      return cb(null, true);
    }
    return cb(new Error('CORS blocked: ' + origin));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Preflight
app.options('*', cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (staticAllow.has(origin) || vercelPreviewRe.test(origin)) {
      return cb(null, true);
    }
    return cb(new Error('CORS blocked: ' + origin));
  },
  credentials: true
}));

// Body & cookies
app.use(express.json());
app.use(cookieParser());

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas (asegúrate de usar tu middleware de auth dentro de cada router)
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
      .then(() => console.log('🟢 Conectado a la base de datos!'))
      .catch(err => console.error('❌ Error al conectar con la base de datos:', err));
  });
});

module.exports = app;
