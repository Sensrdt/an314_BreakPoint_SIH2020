const { Router } = require('express');
const router = new Router();

const User = require('../models/user');

router.post('/', async (req, res) => {
    try {
        console.log(req.user);
        const { googleId } = req.user;
        User.findOne({ googleId }, (err, user) => {
            if (err) {
                res.status(404).send();
            }
            const { location, userType } = req.body;
            user.location = location;
            user.userType = userType;
            user.save((err) => {
                if (err) {
                    res.status(500).send();
                }
            });
        });
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;
