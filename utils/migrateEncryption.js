// // utils/migrateEncryption.js

// require('dotenv').config();
// const User = require('../models/User');
// const CryptoJS = require('crypto-js');

// const OLD_KEY = 'clave-super-secreta'; // La anterior que usaste
// const NEW_KEY = process.env.SECRET_ENCRYPT_KEY;

// function decryptWithOldKey(cipher) {
//   try {
//     const bytes = CryptoJS.AES.decrypt(cipher, OLD_KEY);
//     return bytes.toString(CryptoJS.enc.Utf8);
//   } catch (err) {
//     console.warn('❌ Error desencriptando con la clave vieja:', cipher);
//     return null;
//   }
// }

// function encryptWithNewKey(text) {
//   return CryptoJS.AES.encrypt(text, NEW_KEY).toString();
// }

// (async () => {
//   try {
//     const users = await User.findAll();

//     for (const user of users) {
//       const decryptedName = decryptWithOldKey(user.name);
//       const decryptedPhone = user.phone ? decryptWithOldKey(user.phone) : null;

//       if (decryptedName) {
//         user.name = encryptWithNewKey(decryptedName);
//       }

//       if (decryptedPhone) {
//         user.phone = encryptWithNewKey(decryptedPhone);
//       }

//       await user.save();
//       console.log(`✅ Usuario actualizado: ${user.email}`);
//     }

//     console.log('🎉 Migración completada con éxito');
//   } catch (err) {
//     console.error('💥 Error durante la migración:', err);
//   } finally {
//     process.exit();
//   }
// })();
