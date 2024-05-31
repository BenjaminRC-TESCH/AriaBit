const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');

const {
  renderProductsForm,
  createNewProduct,
  renderProducts,
  renderEditForm,
  updateProduct,
  deleteProducts,
} = require('../controllers/products.controller');

const { isAuthenticated } = require('../helpers/auth');

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDirectory = path.join(__dirname, '../public/uploads');
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

//New products
router.get('/products/add', isAuthenticated, renderProductsForm);
router.post(
  '/products/new-products',
  isAuthenticated,
  upload.single('image'),
  createNewProduct
);

//Get All Products
router.get('/products', isAuthenticated, renderProducts);

//Edit products
router.get('/products/edit/:id', isAuthenticated, renderEditForm);
router.put(
  '/products/edit/:id',
  isAuthenticated,
  upload.single('image'),
  updateProduct
);

//Delete products
router.delete('/products/delete/:id', isAuthenticated, deleteProducts);

module.exports = router;
