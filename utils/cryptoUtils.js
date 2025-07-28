const CryptoJS = require('crypto-js');
const SECRET_KEY = process.env.SECRET_ENCRYPT_KEY || 'clave-super-secreta';

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

function decrypt(cipher) {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = { encrypt, decrypt };
