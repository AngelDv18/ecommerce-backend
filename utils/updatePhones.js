// const User = require('../models/User');
// const { encrypt } = require('./cryptoUtils');
// require('dotenv').config(); // Asegúrate de cargar variables de entorno

// (async () => {
//   const updates = [
//     { email: 'angeldavidg879@gmail.com', phone: '9983424916' },
//     { email: 'econtreras@corporacin.net', phone: '9981000001' },
//     { email: 'fernandogarza@gmail.com', phone: '9981000002' },
//     { email: 'apontegloria@soria.com', phone: '9981000003' },
//     { email: 'joseleiva@corporacin.com', phone: '9981000004' },
//     { email: '202200459@upqroo.edu.mx', phone: '9981000005' },
//     { email: 'sinvsdiewewnfifee33@gmail.ocm', phone: '9981000006' },
//     { email: 'avadv@fd.com', phone: '9981000007' },
//     { email: 'garciajimenez@gmail.com', phone: '9981000008' },
//     { email: '202200459@gmail.com', phone: '9981000009' },
//     { email: 'laywhake666@gmail.com', phone: '9981000010' }
//   ];

//   for (const { email, phone } of updates) {
//     const user = await User.findOne({ where: { email } });
//     if (user) {
//       const encryptedPhone = encrypt(phone);
//       await user.update({ phone: encryptedPhone });
//       console.log(`📱 Encriptado y actualizado ${email} con número ${phone}`);
//     } else {
//       console.warn(`❌ Usuario no encontrado: ${email}`);
//     }
//   }

//   console.log('✅ Todos los números han sido encriptados y actualizados.');
//   process.exit();
// })();


// const User = require('../models/User');
// const { encrypt } = require('../utils/cryptoUtils');

// (async () => {
//   const users = await User.findAll();
//   for (const user of users) {
//     const rawPhone = user.getDataValue('phone');
//     if (!rawPhone) continue;

//     const encrypted = encrypt(rawPhone);
//     await user.update({ phone: encrypted });
//     console.log(`📱 Teléfono encriptado para: ${user.email}`);
//   }

//   console.log('✅ Todos los teléfonos fueron encriptados.');
//   process.exit();
// })();



