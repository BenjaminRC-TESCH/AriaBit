const employeesCtrl = {};
const Employee = require('../models/employees');
const User = require('../models/users');
const Position = require('../models/position');

//New employees
employeesCtrl.renderEmployeesForm = async (req, res) => {
  const position = await Position.find().lean();
  res.render('employees/new-employees', { position });
};

employeesCtrl.createNewEmployees = async (req, res) => {
  const errors = [];
  const { first_name, last_name, address, phone, email, password, position } =
    req.body;

  if (password.length < 8) {
    errors.push({ text: 'La contraseña debe tener almenos 8 caracteres' });
  }
  if (errors.length > 0) {
    res.render('employees/edit-employees', {
      errors,
      first_name,
      last_name,
      address,
      phone,
      email,
      password,
      position,
    });
  } else {
    const emailEmployee = await User.findOne({ email: email });
    if (emailEmployee) {
      req.flash('error_msg', 'El email ya esta registrado');
      res.redirect('/employees/add');
    } else {
      const newEmployee = new Employee({
        first_name,
        last_name,
        address,
        phone,
        email,
        password,
        position,
      });
      await newEmployee.save();
      req.flash('success_msg', 'Empleado registrado satisfactoriamente');
      res.redirect('/employees');
    }
  }
};

//Get All employees
employeesCtrl.renderEmployees = async (req, res) => {
  const employees = await Employee.find({ position: 'Administrador' }).lean();
  res.render('employees/all-employees', { employees });
};

//Edit employees
employeesCtrl.renderEditFormEmployees = async (req, res) => {
  const employees = await User.findById(req.params.id).lean();
  const position = await Position.find().lean();
  res.render('employees/edit-employees', { employees, position });
};

employeesCtrl.updateEmployees = async (req, res) => {
  const { first_name, last_name, address, phone, email, password, position } =
    req.body;
  await User.findByIdAndUpdate(req.params.id, {
    first_name,
    last_name,
    address,
    phone,
    email,
    password,
    position,
  });
  req.flash('success_msg', 'Empleado actualizado correctamente');
  res.redirect('/employees');
};

//Delete employeesCtrl
employeesCtrl.deleteEmployees = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Empleado eliminado correctamente');
  res.redirect('/employees');
};

module.exports = employeesCtrl;
