const express = require('express');
const cors = require('cors');
// Inicializacion
const app = express();

// settings
app.set('port', process.env.PORT || 6000);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users',require('./routes/users'))
app.use('/api/notes',require('./routes/notes'))


module.exports = app;