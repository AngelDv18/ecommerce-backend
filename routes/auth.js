const { Router } = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
const User = require('../models/User');

const router = Router();
const client = new OAuth2Client();

// 🔐 LOGIN NORMAL
router.post('/login', authController.login);

// 🆕 REGISTRO
router.post('/register', authController.register);

// 🔎 VERIFICAR SI CORREO EXISTE
router.get('/check-email', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email requerido' });

  try {
    const exists = await User.findOne({ where: { email } });
    res.json({ exists: !!exists });
  } catch (err) {
    console.error('Error al verificar email:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// ✅ NUEVA RUTA: VERIFICAR SESIÓN ACTIVA
router.get('/check', (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'No autenticado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

// 🔐 LOGIN CON GOOGLE (segunda fase)
router.post('/google', async (req, res) => {
  const { token, email: stepOneEmail } = req.body;
  if (!token || !stepOneEmail) return res.status(400).json({ error: 'Token y correo requeridos' });

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { sub, email } = ticket.getPayload();

    if (email !== stepOneEmail) {
      return res.status(403).json({ error: 'El correo de Google no coincide con el del inicio de sesión' });
    }

    let user = await User.findOne({ where: { google_id: sub } });

    if (!user) {
      user = await User.findOne({ where: { email } });

      if (user) {
        user.google_id = sub;
        await user.save();
      } else {
        return res.status(404).json({ error: 'Usuario no encontrado. Primero inicia sesión con correo y contraseña.' });
      }
    }

    const jwtToken = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: false, // ✅ Cambia a true si usas HTTPS
      sameSite: 'Lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({ email: user.email });

  } catch (err) {
    console.error('Error con token de Google:', err.message);
    res.status(401).json({ error: 'Token de Google inválido' });
  }
});
// 🔓 LOGOUT - limpia la cookie
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, // Cambia a true si estás en producción con HTTPS
    sameSite: 'Lax',
  });
  res.json({ message: 'Sesión cerrada correctamente' });
});


module.exports = router;

// Este código define las rutas de autenticación, incluyendo el registro, login normal y con Google, así como la verificación de email.
// Utiliza el cliente OAuth2 de Google para verificar los tokens y maneja la creación o actualización de usuarios en la base de datos.