// perfil.js
import config from '..//config.js';

//
// import multer from 'multer';
// import path from 'path';


// // Configuración de multer para manejar la subida de archivos
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../uploads/') // Asegúrate de que este directorio exista
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname)) // Añade la extensión original del archivo
//     }
//   });
  
// const upload = multer({ storage: storage });

//

import { ProfileView } from '..//views/profileView.js';
import * as profileController from '..//controllers/profileController.js';
//

(() => {
  ProfileView.init(profileController);
})();

