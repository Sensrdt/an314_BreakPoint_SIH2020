const { Router } = require('express');
const drug = require('./drug');
const target = require('./target');
const collect = require('./collect');

const app = Router();

app.use('/target', target);
app.use('/drug', drug);
app.use('/collect', collect);

module.exports = app;
