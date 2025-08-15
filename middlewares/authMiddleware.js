// const jwt = require('jsonwebtoken');

// // Asegúrate de haber hecho: npm install cookie-parser
// module.exports = (req, res, next) => {
//   const token = req.cookies?.token;

//   if (!token) {
//     return res.status(403).json({ error: 'Token no proporcionado' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Token inválido o expirado' });
//   }
// };


// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1) token por cookie o por header Authorization: Bearer <jwt>
  const bearer = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;
  const cookieToken = req.cookies?.token;
  const token = bearer || cookieToken;

  if (!token) {
    // 401 = no autenticado (mejor que 403)
    return res.status(401).json({ error: 'No autenticado: token ausente' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;              // { id, role, email, iat, exp }
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
// Nota: Asegúrate de que process.env.JWT_SECRET esté definido en tu entorno
// Si estás usando Railway, puedes definirlo en la configuración de tu proyecto
// También puedes usar un archivo .env.local para definir variables de entorno en desarrollo
 