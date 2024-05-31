const categoryCtrl = {};
const Category = require('../models/category');

//New products
categoryCtrl.renderCategoryForm = (req, res) => {
  res.render('category/new-category');
};

categoryCtrl.createNewCategory = async (req, res) => {
  const { description } = req.body;
  const newCategory = new Category({ description });
  await newCategory.save();
  req.flash('success_msg', 'Categoria agregada correctamente');
  res.redirect('/category');
};

//Get All products
categoryCtrl.renderCategory = async (req, res) => {
  const category = await Category.find().lean();
  res.render('category/all-category', { category });
};

//Edit products
categoryCtrl.renderEditFormCategory = async (req, res) => {
  const category = await Category.findById(req.params.id).lean();
  res.render('category/edit-category', { category });
};

categoryCtrl.updateCategory = async (req, res) => {
  const { description } = req.body;
  await Category.findByIdAndUpdate(req.params.id, {
    description,
  });
  req.flash('success_msg', 'Categoria actualizada correctamente');
  res.redirect('/category');
};

//Delete products
categoryCtrl.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Categoria eliminada correctamente');
  res.redirect('/category');
};

module.exports = categoryCtrl;
