const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuracion de la base de datos
const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URI, // obtiene la url de conexión desde las variables de entorno
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

mongoose.set("debug", true);

require('./models/Usuario')
require('./models/Mascota')
require('./models/Solicitud')

// Al final se importa passport ya que se usan los modelos en la configuracion de passport
require('./config/passport');

// Rutas
app.use('/v1', require('./routes/index'))

// Iniciando el servidor
const PORT = 4001;
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})

