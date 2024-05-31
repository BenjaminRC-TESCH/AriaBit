const indexCtrl = {};
const Product = require('../models/products');

indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

indexCtrl.renderLogin = (req, res) => {
  res.render('login');
};

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};

//Get All products shop
indexCtrl.renderShop = async (req, res) => {
  const products = await Product.find().lean();
  res.render('shop', { products });
};

indexCtrl.renderpruebas = (req, res) => {
  res.render('pruebas');
};

module.exports = indexCtrl;
