const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const User = require('../models/User');
const { decrypt } = require('../utils/cryptoUtils'); // Importa función para desencriptar

// Ver TODAS las órdenes (admin)
router.get('/orders', auth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: {
            model: Product,
            attributes: ['name', 'price']
          }
        },
        {
          model: User,
          attributes: ['id', 'name', 'email', 'rfc']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las órdenes' });
  }
});

// Obtener todos los usuarios (solo admin)
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'phone', 'rfc', 'created_at'],
      order: [['id', 'ASC']]
    });

    // Desencriptar name y phone
    const decryptedUsers = users.map(user => ({
      ...user.toJSON(),
      name: decrypt(user.name),
      phone: user.phone ? decrypt(user.phone) : null,
      rfc: user.rfc ? decrypt(user.rfc) : null
    }));

    res.json(decryptedUsers);
  } catch (err) {
    console.error('❌ Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

module.exports = router;
