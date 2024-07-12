
require('dotenv').config();

const express = require('express');
//C:\UTP_Semestre2024_I\DS9\Laboratorios\ProjFinal2024DS9v3\mongoose\db.js

const cors = require('cors');

const { connectToDatabase } = require('./mongoose/db');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require('./routes/rutaUsers');
const servicioRoutes = require('./routes/servicioRoutes');
//const familiarRoutes = require('./routes/rutaFamiliarDeprecated');
const ordenServicioRoutes = require('./routes/ordenesRoutes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/servicios', servicioRoutes);
//app.use('/api/familiar', familiarRoutes);
app.use('/api/ordenes', ordenServicioRoutes);

// Connect to the database
connectToDatabase();

// Rest of your Express app setup and routes go here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`jwt-palabra ${process.env.JWT_SECRET}`);
  console.log(`Server is running on port ${PORT}`);
});
