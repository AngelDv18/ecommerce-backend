// const User = require('../models/User');
// const { encrypt } = require('./cryptoUtils');
// require('dotenv').config();

// (async () => {
//   try {
//     // Trae el usuario por correo (ajusta si quieres hacerlo por ID)
//     const user = await User.findOne({ where: { email: 'angeldavidg879@gmail.com' } });

//     if (!user) {
//       console.error('❌ Usuario no encontrado');
//       return;
//     }

//     // Solo encriptar si aún no está cifrado (ej. no empieza con "U2FsdGVkX1")
//     if (!user.name.startsWith('U2FsdGVkX1')) {
//       user.name = encrypt('Angel David Garcia Garcia');
//     }
//     if (!user.phone || !user.phone.startsWith('U2FsdGVkX1')) {
//       user.phone = encrypt('9983424916');
//     }
//     if (!user.rfc || !user.rfc.startsWith('U2FsdGVkX1')) {
//       user.rfc = encrypt('XAXX010101ABC');
//     }

//     await user.save();
//     console.log('✅ Datos encriptados exitosamente');

//   } catch (error) {
//     console.error('❌ Error al encriptar el usuario:', error);
//   }
// })();
