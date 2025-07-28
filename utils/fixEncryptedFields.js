// const User = require('../models/User');
// const { encrypt, decrypt } = require('../utils/cryptoUtils');

// (async () => {
//   const users = await User.findAll();
//   for (const user of users) {
//     const rawName = user.getDataValue('name');
//     const rawPhone = user.getDataValue('phone');

//     // Solo si no está encriptado (detectamos texto plano)
//     if (!rawName?.startsWith('U2FsdGVkX1')) {
//       await user.update({ name: encrypt(rawName) });
//       console.log(`🔐 Encriptado nombre: ${rawName}`);
//     }

//     if (rawPhone && !rawPhone.startsWith('U2FsdGVkX1')) {
//       await user.update({ phone: encrypt(rawPhone) });
//       console.log(`🔐 Encriptado teléfono: ${rawPhone}`);
//     }
//   }

//   console.log('✅ Todos los campos sensibles han sido encriptados.');
//   process.exit();
// })();
