const { Router } = require('express');
const router = Router();

const {
  renderEmployeesForm,
  createNewEmployees,
  renderEmployees,
  renderEditFormEmployees,
  updateEmployees,
  deleteEmployees,
} = require('../controllers/employees.controller');

const { isAuthenticated } = require('../helpers/auth');
//New employees
router.get('/employees/add', isAuthenticated, renderEmployeesForm);
router.post('/employees/new-employees', isAuthenticated, createNewEmployees);

//Get All employees
router.get('/employees', isAuthenticated, renderEmployees);

//Edit employees
router.get('/employees/edit/:id', isAuthenticated, renderEditFormEmployees);
router.put('/employees/edit/:id', isAuthenticated, updateEmployees);

//Delete employees
router.delete('/employees/delete/:id', isAuthenticated, deleteEmployees);

module.exports = router;
