const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { encrypt } = require('../utils/cryptoUtils');

const isProduction = process.env.NODE_ENV === 'production';

exports.register = async (req, res) => {
  const { name, email, password, phone, rfc } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese correo' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const encryptedName = encrypt(name);
    const encryptedPhone = phone ? encrypt(phone) : null;
    const encryptedRfc = rfc ? encrypt(rfc) : null;

    const newUser = await User.create({
      name: encryptedName,
      email,
      password_hash,
      phone: encryptedPhone,
      rfc: encryptedRfc,
      role: 'user'
    });

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.password_hash) return res.status(401).json({ error: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction, // ✅ true en producción, false en local
      sameSite: isProduction ? 'None' : 'Lax', // ✅ None para frontend en otro dominio
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',           // 👈 añado esto por consistencia, explícalo, necesario para que la cookie sea accesible en todas las rutas
    });

    res.json({ message: 'Login correcto', email: user.email });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
