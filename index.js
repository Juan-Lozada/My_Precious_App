const express = require('express');
const cors = require('cors')
const PORT = 3000;
const show = require('./src/indexRoute/indexRoute');

const app = express();

app.use(cors());

app.use('/', show )

app.listen(PORT, console.log(`SERVIDOR ENCENDIDO PUERTO: ${PORT}`))

