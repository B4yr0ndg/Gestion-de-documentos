// Importa el archivo 'configEnv.js' para cargar las variables de entorno
const { configEnv } = require('./config/configEnv.js');

// Importa el mÃÂÃÂ³dulo 'express' para crear la aplicaciÃÂÃÂ³n web
const express = require('express');

// Importa el enrutador principal
const indexRoutes = require('./routes/index.routes.js');

// Obtiene las variables de entorno
const { PORT } = configEnv();

// Importa el archivo 'configDB.js' para crear la conexiÃÂÃÂ³n a la base de datos
require('./config/configDB.js');

// Crea una instancia de la aplicaciÃÂÃÂ³n
const app = express();

// Agrega el middleware para el manejo de datos en formato JSON
app.use(express.json());


// Agrega el enrutador principal al servidor
app.use('/api', indexRoutes);

// Inicia el servidor web en el puerto 3000
// La funciÃÂÃÂ³n de callback muestra un mensaje en la consola indicando que el servidor estÃÂÃÂ¡ en ejecuciÃÂÃÂ³n
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
