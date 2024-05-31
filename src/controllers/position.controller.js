const positionCtrl = {};
const Position = require('../models/position');

//New position
positionCtrl.renderPositionForm = (req, res) => {
  res.render('position/new-position');
};

positionCtrl.createNewPosition = async (req, res) => {
  const { description } = req.body;
  const newPosition = new Position({ description });
  await newPosition.save();
  req.flash('success_msg', 'Posición agregada correctamente');
  res.redirect('/position');
};

//Get All products
positionCtrl.renderPosition = async (req, res) => {
  const position = await Position.find().lean();
  res.render('position/all-position', { position });
};

//Edit products
positionCtrl.renderEditFormPosition = async (req, res) => {
  const position = await Position.findById(req.params.id).lean();
  res.render('position/edit-position', { position });
};

positionCtrl.updatePosition = async (req, res) => {
  const { description } = req.body;
  await Position.findByIdAndUpdate(req.params.id, {
    description,
  });
  req.flash('success_msg', 'Posición actualizada correctamente');
  res.redirect('/position');
};

//Delete products
positionCtrl.deletePosition = async (req, res) => {
  await Position.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Posición eliminada correctamente');
  res.redirect('/position');
};

module.exports = positionCtrl;
