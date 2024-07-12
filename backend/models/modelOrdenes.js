const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Primero, definimos el esquema para la cita del servicio
const citaDelServicioSchema = new Schema({
  fechaInicial: Date,
  fechaFinal: Date,
  horaInicio: String,
  horaFin: String,
  // Puedes agregar más campos específicos de la cita si es necesario
});

// Ahora, definimos el esquema principal
const ordenServicioSchema = new Schema({
  numeroOrden: Number,
  usuario: { 
    type: String, 
    required: true, 
    unique: true 
  },
  idDelServicio: String,
  usuarioDelProveedor: String,
  fechaCreacion: { 
    type: Date, 
    default: Date.now 
  },
  estado: { 
    type: String, 
    enum: ['pendiente', 'en_proceso', 'completado', 'cancelado'], 
    default: 'pendiente' 
  },
  calificacion: { 
    puntaje: { 
      type: Number, 
      min: 1, 
      max: 5 
    },
    comentario: String, 
    fecha: Date 
  },
  detalles: Schema.Types.Mixed, // Para almacenar detalles específicos del servicio
  citasDelServicio: [citaDelServicioSchema],
  cantidad: {
    type: Number,
    comment: "Cantidad de horas"
  },
  precio: Number,
  monto: Number
});

// Creamos el modelo a partir del esquema
const OrdenServicio = mongoose.model('OrdenServicio', ordenServicioSchema);

module.exports = OrdenServicio;