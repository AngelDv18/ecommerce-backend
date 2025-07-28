// const User = require('../models/User');
// const { encrypt } = require('./cryptoUtils');
// require('dotenv').config();

// (async () => {
//   const users = await User.findAll();

//   for (const user of users) {
//     if (user.name) {
//       const encryptedName = encrypt(user.name);
//       await user.update({ name: encryptedName });
//       console.log(`🔒 Nombre encriptado para ${user.email}`);
//     }
//   }

//   console.log('✅ Todos los nombres han sido encriptados.');
//   process.exit();
// })();
// const User = require('../models/User');
// const { encrypt } = require('../utils/cryptoUtils');

// (async () => {
//   const users = await User.findAll();
//   for (const user of users) {
//     const name = user.getDataValue('name'); // evita llamar al getter que ya intenta desencriptar
//     const encrypted = encrypt(name);
//     await user.update({ name: encrypted });
//     console.log(`🔒 Nombre encriptado para: ${user.email}`);
//   }
//   console.log('✅ Todos los nombres fueron encriptados.');
//   process.exit();
// })();
