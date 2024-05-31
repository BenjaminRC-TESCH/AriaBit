const { Router } = require('express');
const router = Router();

const {
  renderPositionForm,
  createNewPosition,
  renderPosition,
  renderEditFormPosition,
  updatePosition,
  deletePosition,
} = require('../controllers/position.controller');

const { isAuthenticated } = require('../helpers/auth');

//New category
router.get('/position/add', isAuthenticated, renderPositionForm);
router.post('/position/new-position', isAuthenticated, createNewPosition);

//Get All category
router.get('/position', isAuthenticated, renderPosition);

//Edit category
router.get('/position/edit/:id', isAuthenticated, renderEditFormPosition);
router.put('/position/edit/:id', isAuthenticated, updatePosition);

//Delete category
router.delete('/position/delete/:id', isAuthenticated, deletePosition);

module.exports = router;
