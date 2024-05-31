const usersCtrl = {};
const User = require('../models/users');
const Position = require('../models/position');

//New users
usersCtrl.renderUsersForm = async (req, res) => {
  const position = await Position.find().lean();
  res.render('users/new-users', { position });
};

usersCtrl.createNewUsers = async (req, res) => {
  const errors = [];
  const { first_name, last_name, address, phone, email, password, position } =
    req.body;

  if (password.length < 8) {
    errors.push({ text: 'La contraseña debe tener almenos 8 caracteres' });
  }
  if (errors.length > 0) {
    res.render('users/edit-users', {
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
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash('error_msg', 'El email ya esta registrado');
      res.redirect('/users/add');
    } else {
      const newUser = new User({
        first_name,
        last_name,
        address,
        phone,
        email,
        password,
        position,
      });
      await newUser.save();
      req.flash('success_msg', 'Usuario registrado satisfactoriamente');
      res.redirect('/users');
    }
  }
};

//Get All users
usersCtrl.renderUsers = async (req, res) => {
  const users = await User.find({ position: 'Cliente' }).lean();
  res.render('users/all-users', { users });
};

//Edit users
usersCtrl.renderEditFormUsers = async (req, res) => {
  const users = await User.findById(req.params.id).lean();
  const position = await Position.find().lean();
  res.render('users/edit-users', { users, position });
};

usersCtrl.updateUsers = async (req, res) => {
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
  req.flash('success_msg', 'Usuario actualizado correctamente');
  res.redirect('/users');
};

//Delete users
usersCtrl.deleteUsers = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Usuario eliminado correctamente');
  res.redirect('/users');
};

module.exports = usersCtrl;
