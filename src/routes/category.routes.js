const { Router } = require('express');
const router = Router();

const {
  renderCategoryForm,
  createNewCategory,
  renderCategory,
  renderEditFormCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');

const { isAuthenticated } = require('../helpers/auth');

//New category
router.get('/category/add', isAuthenticated, renderCategoryForm);
router.post('/category/new-category', isAuthenticated, createNewCategory);

//Get All category
router.get('/category', isAuthenticated, renderCategory);

//Edit category
router.get('/category/edit/:id', isAuthenticated, renderEditFormCategory);
router.put('/category/edit/:id', isAuthenticated, updateCategory);

//Delete category
router.delete('/category/delete/:id', isAuthenticated, deleteCategory);

module.exports = router;
