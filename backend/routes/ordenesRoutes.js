const express = require('express');
const router = express.Router();
const OrdenServicio = require('../models/modelOrdenes'); // Asegúrate de que la ruta sea correcta

// POST /api/orden-servicio
router.post('/addorden', async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const {
      numeroOrden,
      usuario,
      idDelServicio,
      usuarioDelProveedor,
      estado,
      calificacion,
      detalles,
      citasDelServicio,
      cantidad,
      precio,
      monto
    } = req.body;

    // Crear una nueva instancia de OrdenServicio
    const nuevaOrden = new OrdenServicio({
      numeroOrden,
      usuario,
      idDelServicio,
      usuarioDelProveedor,
      estado,
      calificacion,
      detalles,
      citasDelServicio,
      cantidad,
      precio,
      monto
    });

    // Guardar la nueva orden en la base de datos
    const ordenGuardada = await nuevaOrden.save();

    // Responder con la orden guardada
    res.status(201).json(ordenGuardada);
  } catch (error) {
    // Si hay un error, verificar si es un error de validación
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    // Para otros tipos de errores
    res.status(500).json({ message: 'Error al crear la orden de servicio', error: error.message });
  }
});

module.exports = router;