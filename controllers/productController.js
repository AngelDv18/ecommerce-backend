const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const image_url = req.files?.image_url?.[0]?.path;
    const video_dinamico = req.files?.video_dinamico?.[0]?.path;
    const video_ejecutable = req.files?.video_ejecutable?.[0]?.path;

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      image_url,
      video_dinamico,
      video_ejecutable,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('❌ Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};


// Actualizar producto
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price, stock } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    await product.update({
      name,
      description,
      price,
      stock,
      ...(req.files?.image_url?.[0]?.path && { image_url: req.files.image_url[0].path }),
      ...(req.files?.video_dinamico?.[0]?.path && { video_dinamico: req.files.video_dinamico[0].path }),
      ...(req.files?.video_ejecutable?.[0]?.path && { video_ejecutable: req.files.video_ejecutable[0].path }),
    });

    res.json({ message: 'Producto actualizado correctamente', product });
  } catch (error) {
    console.error('❌ Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};


// Eliminar producto
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    await product.destroy();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct
};
// controllers/productController.js