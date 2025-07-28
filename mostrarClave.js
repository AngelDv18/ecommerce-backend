// // require('dotenv').config(); // 👈 Esto carga las variables del archivo .env
// // console.log(process.env.SECRET_ENCRYPT_KEY);

// // utils/mostrarUsuarios.js
// require('dotenv').config();
// const User = require('../models/User');
// const { decrypt } = require('../utils/cryptoUtils');

// (async () => {
//   const users = await User.findAll();
//   users.forEach(user => {
//     console.log(`${user.email} | ${decrypt(user.name)} | ${user.phone ? decrypt(user.phone) : 'Sin número'}`);
//   });
// })();
// // .catch(err => console.error('Error al mostrar usuarios:', err))
// // .finally(() => process.exit());
