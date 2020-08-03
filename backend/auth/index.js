const passport = require('passport');
const { Router } = require('express');

const app = Router();

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

app.get('/profile', (req, res) => {
    res.send(req.user);
});

app.get('/logout', (req, res) => {
    req.logout();
    res.send();
});

module.exports = app;
