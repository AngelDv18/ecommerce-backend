const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { encrypt, decrypt } = require('../utils/cryptoUtils');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('name', encrypt(value));
    },
    get() {
      const raw = this.getDataValue('name');
      try {
        return decrypt(raw);
      } catch (error) {
        console.warn('⚠️ Nombre no desencriptado:', raw);
        return raw;
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password_hash: {
    type: DataTypes.STRING,
  },
  google_id: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue('phone', encrypt(value));
    },
    get() {
      const raw = this.getDataValue('phone');
      try {
        return decrypt(raw);
      } catch (error) {
        console.warn('⚠️ Teléfono no desencriptado:', raw);
        return raw;
      }
    }
  },
  rfc: {
  type: DataTypes.STRING,
  set(value) {
    this.setDataValue('rfc', encrypt(value));
  },
  get() {
    const raw = this.getDataValue('rfc');
    try {
      return decrypt(raw);
    } catch (error) {
      console.warn('⚠️ RFC no desencriptado:', raw);
      return raw;
    }
  }
},
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
if (process.env.NODE_ENV !== 'production') {
  User.sync({ alter: true })
    .then(() => console.log('✅ Tabla de usuarios sincronizada'))
    .catch(err => console.error('❌ Error al sincronizar tabla de usuarios:', err));
}
