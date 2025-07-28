const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const sequelize = require('../config/database');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

// Crear nueva orden
router.post('/', auth, async (req, res) => {
  const { items } = req.body; // items = [{ product_id, quantity }]

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Debes enviar al menos un producto' });
  }

  try {
    let total_price = 0;

    const orderItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findByPk(item.product_id);
      if (!product || product.stock < item.quantity) {
        throw new Error(`Producto inválido o sin stock: ID ${item.product_id}`);
      }

      const subtotal = product.price * item.quantity;
      total_price += subtotal;

      return {
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: product.price
      };
    }));

    // Crear orden
    const newOrder = await Order.create({
      user_id: req.user.id,
      total_price
    });

    // Guardar items
    for (const item of orderItems) {
      await OrderItem.create({
        order_id: newOrder.id,
        ...item
      });
    }

    res.status(201).json({ message: 'Orden creada con éxito', order_id: newOrder.id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la orden' });
  }
});

// Ver historial de órdenes del usuario actual
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']],
      include: {
        model: OrderItem,
        include: {
          model: Product,
          attributes: ['name', 'price']
        }
      }
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener historial de órdenes' });
  }
});

module.exports = router;
