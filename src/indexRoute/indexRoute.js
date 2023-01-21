const express = require('express')
const app = express()

const indexController = require('../controllers/indexController')

app.get('/', indexController.joyas);
app.get('/joyas/:id', indexController.findJoya);
app.get('/joyas/filtros', indexController.filterJoyas)
app.get('*', indexController.notFound)


module.exports = app;