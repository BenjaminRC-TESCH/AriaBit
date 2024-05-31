const { Schema, model } = require('mongoose');

const typeOfProductsSchema = new Schema(
  {
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = model('category', typeOfProductsSchema);
