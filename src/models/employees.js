const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const EmployeeSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    password: { type: String },
    position: { type: String, default: 'Administrador' },
    //position: { type: Schema.Types.ObjectId, ref: 'Position' },
  },
  { timestamps: true }
);

EmployeeSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

EmployeeSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model('Employee', EmployeeSchema);
