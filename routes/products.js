const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = require('../utils/cloudinaryStorage');
const upload = multer({ storage });

const { createProduct,updateProduct, deleteProduct } = require('../controllers/productController');
const Product = require('../models/Product');

// GET: obtener productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// POST: crear producto con imagen
router.post('/', upload.fields([
  { name: 'image_url', maxCount: 1 },
  { name: 'video_dinamico', maxCount: 1 },
  { name: 'video_ejecutable', maxCount: 1 }
]), createProduct);

// PUT: actualizar producto con imagen
router.put('/:id', upload.fields([
  { name: 'image_url', maxCount: 1 },
  { name: 'video_dinamico', maxCount: 1 },
  { name: 'video_ejecutable', maxCount: 1 }
]), updateProduct);

// DELETE: eliminar producto
router.delete('/:id', deleteProduct);


module.exports = router;
// controllers/productController.js