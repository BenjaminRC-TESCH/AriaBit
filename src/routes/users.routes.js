const { Router } = require('express');
const router = Router();

const {
  renderUsersForm,
  createNewUsers,
  renderUsers,
  renderEditFormUsers,
  updateUsers,
  deleteUsers,
} = require('../controllers/users.controller');

const { isAuthenticated } = require('../helpers/auth');
//New Users
router.get('/users/add', isAuthenticated, renderUsersForm);
router.post('/users/new-products', isAuthenticated, createNewUsers);

//Get All Users
router.get('/users', isAuthenticated, renderUsers);

//Edit Users
router.get('/users/edit/:id', isAuthenticated, renderEditFormUsers);
router.put('/users/edit/:id', isAuthenticated, updateUsers);

//Delete Users
router.delete('/users/delete/:id', isAuthenticated, deleteUsers);

module.exports = router;
