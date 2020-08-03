require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const cookie = require('cookie-session');
const { Strategy } = require('passport-google-oauth20');

const auth = require('./auth');
const User = require('./models/user');
const api = require('./routes');

const env = process.env.NODE_ENV || 'development';

const {
    connect: connectToDatabase,
    connection: databaseConnection,
} = require('mongoose');

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    console.log(req.body);
    next();
});

const { CLIENT_ID: clientID, CLIENT_SECRET: clientSecret } = process.env;
const callbackURL = 'https://reelitin.herokuapp.com/auth/google/callback';
// const callbackURL = 'http://localhost:8080/auth/google/callback';

if (env === 'production')
    app.use(
        ['/', '/login', '/drugs', '/guide', '/supl', '/pres', '/disp'],
        express.static(path.join(path.resolve(), '../frontend/build')),
    );
passport.use(
    new Strategy(
        {
            clientID,
            clientSecret,
            callbackURL,
        },
        (accessToken, refreshToken, profile, callback) => {
            const query = { googleId: profile.id };
            const email = profile.emails.find((mail) => {
                return mail.verified;
            }).value;
            const update = {
                accessToken,
                refreshToken,
                googleId: profile.id,
                name: profile.displayName,
                email: !email ? profile.emails[0].value : email,
            };
            const options = {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            };
            User.findOneAndUpdate(query, update, options)
                .then((result) => {
                    callback(null, result);
                })
                .catch((err) => {
                    callback(err, null);
                });
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

passport.deserializeUser((user, done) => {
    User.findOne({ googleId: user })
        .then((result) => {
            done(null, result);
        })
        .catch((err) => {
            done(err, null);
        });
});

app.use(
    cookie({
        name: 'reelitin-session',
        keys: ['super-secret-key', 'super-secret-key'],
    }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);
app.use('/api', api);

const {
    env: { USERNAME: user, PASSWORD: pass, PORT },
} = process;

connectToDatabase('mongodb+srv://reelitin.5jxp1.mongodb.net/reelitin', {
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
