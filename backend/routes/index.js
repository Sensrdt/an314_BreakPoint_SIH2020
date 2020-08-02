const { Router } = require('express');
const drug = require('./drug');
const target = require('./target');

const app = Router();

app.use('/target', target);
app.use('/drug', drug);

module.exports = app;
