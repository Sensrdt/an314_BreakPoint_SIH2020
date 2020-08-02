const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const { Router } = require('express');
const cookie = require('cookie-session');

const User = require('../models/user');

const { CLIENT_ID: clientID, CLIENT_SECRET: clientSecret } = process.env;
const callbackURL = 'http://localhost:8080/auth/google/callback';

const app = Router();

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

app.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
);

app.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    },
);

app.get('/test', (req, res) => {
    res.send(req.user);
});

module.exports = app;
