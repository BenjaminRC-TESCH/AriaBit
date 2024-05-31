const { Schema, model } = require('mongoose');

const positionSchema = new Schema(
  {
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = model('position', positionSchema);
