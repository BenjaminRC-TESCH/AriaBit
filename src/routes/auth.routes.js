const { Router } = require('express');
const router = Router();

const {
  renderSignUpForm,
  signup,
  renderSignInForm,
  signin,
  logout,
} = require('../controllers/auth.controller');

router.get('/auth/signup', renderSignUpForm);
router.post('/auth/signup', signup);

router.get('/auth/signin', renderSignInForm);
router.post('/auth/signin', signin);

router.get('/auth/logout', logout);

module.exports = router;
