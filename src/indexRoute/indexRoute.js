const express = require('express')
const app = express()

const indexController = require('../controllers/indexController')

app.get('/joyas', indexController.joyas);
app.get('/joya/:id', indexController.findJoya);
app.get('/joyas/filtros', indexController.filterJoyas)
app.get('*', indexController.notFound)


module.exports = app;