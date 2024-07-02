
// const express = require('express');
// const mongoose = require('mongoose');
// import cors from 'cors';
// require('dotenv').config();
// app.js


require('dotenv').config();

const express = require('express');
//C:\UTP_Semestre2024_I\DS9\Laboratorios\ProjFinal2024DS9v3\mongoose\db.js

const cors = require('cors');


const { connectToDatabase } = require('./mongoose/db');

const app = express();
app.use(cors());
const userRoutes = require('./routes/rutaUsers');

app.use(express.json());
app.use('/api/users', userRoutes);

// Connect to the database
connectToDatabase();

// Rest of your Express app setup and routes go here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const app = express();
// const urlMongo = 'mongodb+srv://emsalinasl:utpds924@clusterdsix24.kzejgkh.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDSIX24'

// // Connect to MongoDB
// mongoose.connect(urlMongo, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Could not connect to MongoDB', err));

// // Define routes and middleware here

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server running on port ${port}`));

