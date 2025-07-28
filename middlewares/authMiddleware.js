const jwt = require('jsonwebtoken');

// Asegúrate de haber hecho: npm install cookie-parser
module.exports = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
