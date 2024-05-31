const { Schema, model } = require('mongoose');

const productsSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    type: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = model('Product', productsSchema);
