const express = require('express');
const routes = require('./routes'); // "./" necessário porque se trata de um arquivo.
const cors = require('cors');
const {errors} = require('celebrate');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;