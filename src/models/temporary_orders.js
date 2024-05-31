const {Schema, model} = require('mongoose');

const temporaryOrdersSchema = new Schema({
    idCliente: {type: String},
    nombreCliente: {type: String},
    idProducto: {type: String},
    nombreProducto: {type: String},
    fecha: {type: String},
    precioProducto: {type: String},
    precioTotal: {type: String},
    //created_at: {type: Date, default: Date.now()}
},{timestamps: true})

module.exports = model('temporary_orders', temporaryOrdersSchema)