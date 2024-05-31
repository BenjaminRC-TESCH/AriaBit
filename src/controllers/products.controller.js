const productsCtrl = {};
const Product = require('../models/products');
const Category = require('../models/category');

//New products
productsCtrl.renderProductsForm = async (req, res) => {
  const categories = await Category.find().lean();
  res.render('products/new-products', { categories });
};

productsCtrl.createNewProduct = async (req, res) => {
  const { name, description, price, type } = req.body;
  const image = req.file.filename; // Nombre del archivo guardado por multer

  const newProduct = new Product({ name, description, price, type, image });
  await newProduct.save();

  req.flash('success_msg', 'Producto agregado correctamente');
  res.redirect('/products');
};

//Get All products
productsCtrl.renderProducts = async (req, res) => {
  const products = await Product.find().lean();
  res.render('products/all-products', { products });
};

//Edit products
productsCtrl.renderEditForm = async (req, res) => {
  const categories = await Category.find().lean();
  const product = await Product.findById(req.params.id).lean();
  res.render('products/edit-product', { product, categories });
};

productsCtrl.updateProduct = async (req, res) => {
  const { name, description, price, type } = req.body;
  const image = req.file.filename;
  await Product.findByIdAndUpdate(req.params.id, {
    name,
    description,
    price,
    type,
    image,
  });
  req.flash('success_msg', 'Producto actualizado correctamente');
  res.redirect('/products');
};

//Delete products
productsCtrl.deleteProducts = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Producto eliminado correctamente');
  res.redirect('/products');
};

module.exports = productsCtrl;
