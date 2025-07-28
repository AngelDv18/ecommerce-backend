const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const User = require('../models/User');
const { decrypt } = require('../utils/cryptoUtils');

// Ruta protegida: perfil
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const decryptedName = decrypt(user.name);
    const decryptedPhone = user.phone ? decrypt(user.phone) : null;
    const decryptedRFC = user.rfc ? decrypt(user.rfc) : null;


    res.json({
      id: user.id,
      name: decryptedName,
      email: user.email,
      phone: decryptedPhone,
      rfc: decryptedRFC,
      role: user.role,
      created_at: user.created_at,
    });
  } catch (err) {
    console.error('Error al obtener perfil:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
