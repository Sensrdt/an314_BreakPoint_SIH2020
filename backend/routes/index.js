const { Router } = require('express');
const drug = require('./drug');
const target = require('./target');
const collect = require('./collect');
const userdata = require('./userdata');

const app = Router();

app.use('/target', target);
app.use('/drug', drug);
app.use('/collect', collect);
app.use('/user', userdata);

module.exports = app;
