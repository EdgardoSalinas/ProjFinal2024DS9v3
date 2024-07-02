// In your user model file (e.g., models/User.js)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  tipodeusuario: {
    type: String,
    enum: ['usuario', 'proveedor'],
    default: 'usuario'
  },
  nombre: String,
  Apellido: String,
  email: { type: String, required: true, unique: true },
  contrasena: String,
  numerodecelular: String,
  direccion1: String,
  direccion2: String,
  direccion3: String,
  acercademi: String,
  cedula: String,
  ruc: String,
  placavehiculo: String,
  generalesdelvehiculo: String,
  referenciapersonalnombrecompleto: String,
  referenciapersonalcelular: String,
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);