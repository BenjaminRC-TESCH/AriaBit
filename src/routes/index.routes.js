const { Router } = require('express');

const router = Router();

const {
  renderIndex,
  renderLogin,
  renderAbout,
  renderShop,
  renderpruebas,
} = require('../controllers/index.controllers');

router.get('/', renderIndex);

router.get('/login', renderLogin);

router.get('/about', renderAbout);

//Get All Products
router.get('/shop', renderShop);

router.get('/pruebas', renderpruebas);

module.exports = router;
