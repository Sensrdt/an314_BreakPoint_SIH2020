const { Router } = require('express');
const SuplPost = require('../models/post/supl_post');
const PresPost = require('../models/post/pres_post');
const DispPost = require('../models/post/disp_post');
const router = new Router();

router.post('/supl', async (req, res) => {
    try {
        const data = new SuplPost(req.body.payload);
        data.save((err) => {
            console.log(err);
        });
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/pres', async (req, res) => {
    try {
        const data = new PresPost({ ...req.body.payload, location: 'Assam' });
        // TODO: Replace location with req.user.location, once implemented
        data.save((err) => {
            console.log(err);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post('/disp', async (req, res) => {
    try {
        const data = new DispPost({ ...req.body.payload, location: 'Assam' });
        // TODO: Replace location with req.user.location, once implemented
        data.save((err) => {
            console.log(err);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;
