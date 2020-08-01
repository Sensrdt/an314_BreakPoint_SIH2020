require('dotenv').config();
const express = require('express');
const auth = require('./auth');
const {
    connect: connectToDatabase,
    connection: databaseConnection,
} = require('mongoose');

const app = express();

app.use(express.json());
app.use('/auth', auth);
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

app.get('/', (req, res) => {
    res.send('This is the (not so) home page!!');
});

const {
    env: { USERNAME: user, PASSWORD: pass, PORT },
} = process;

connectToDatabase('mongodb+srv://reelitin.5jxp1.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    user,
    pass,
});

databaseConnection.once('open', () => {
    console.log('Connected');
    app.listen(PORT);
});
