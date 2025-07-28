// const User = require('../models/User');
// const CryptoJS = require('crypto-js');
// require('dotenv').config();

// // Cambia estas claves si fuera necesario
// const NEW_KEY = process.env.SECRET_ENCRYPT_KEY;
// const OLD_KEY = 'clave-super-secreta'; // clave anterior

// function decryptWithOldKey(cipher) {
//   try {
//     const bytes = CryptoJS.AES.decrypt(cipher, OLD_KEY);
//     const decrypted = bytes.toString(CryptoJS.enc.Utf8);
//     return decrypted || null;
//   } catch {
//     return null;
//   }
// }

// function decryptWithNewKey(cipher) {
//   try {
//     const bytes = CryptoJS.AES.decrypt(cipher, NEW_KEY);
//     const decrypted = bytes.toString(CryptoJS.enc.Utf8);
//     return decrypted || null;
//   } catch {
//     return null;
//   }
// }

// function encryptWithNewKey(text) {
//   return CryptoJS.AES.encrypt(text, NEW_KEY).toString();
// }

// (async () => {
//   const users = await User.findAll();
//   let totalCorruptos = 0;

//   for (const user of users) {
//     let actualizado = false;

//     // Validación nombre
//     const nombreValido = decryptWithNewKey(user.name) || decryptWithOldKey(user.name);
//     if (!nombreValido) {
//       user.name = encryptWithNewKey('NO DISPONIBLE');
//       actualizado = true;
//       console.warn(`⚠️ Nombre corrupto para: ${user.email}`);
//     }

//     // Validación teléfono
//     if (user.phone) {
//       const telefonoValido = decryptWithNewKey(user.phone) || decryptWithOldKey(user.phone);
//       if (!telefonoValido) {
//         user.phone = encryptWithNewKey('NO DISPONIBLE');
//         actualizado = true;
//         console.warn(`⚠️ Teléfono corrupto para: ${user.email}`);
//       }
//     }

//     if (actualizado) {
//       await user.save();
//       totalCorruptos++;
//       console.log(`✅ Usuario corregido: ${user.email}`);
//     }
//   }

//   console.log(`🎯 Limpieza completada. Usuarios corregidos: ${totalCorruptos}`);
//   process.exit();
// })();
