const express = require('express');
const supl_post = require('../models/post/supl_post');
const pres_post = require('../models/post/pres_post');
const disp_post = require('../models/post/disp_post');
const router = new express.Router();

router.post('/collect/supl', async (req, res) => {
    try {
        let data = req.body.payload;
        supl_post.insertOne(data, (err) => {
            console.log(err);
        });
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/collect/pres', async (req, res) => {
    try {
        let data = req.body.payload;
        pres_post.insertOne(data, (err) => {
            console.log(err);
        });
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/collect/disp', async (req, res) => {
    try {
        let data = req.body.payload;
        disp_post.insertOne(data, (err) => {
            console.log(err);
        });
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
