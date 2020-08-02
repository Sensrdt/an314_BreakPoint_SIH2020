const { Router } = require('express');
const supl_post = require('../models/post/supl_post');
const pres_post = require('../models/post/pres_post');
const disp_post = require('../models/post/disp_post');
const router = new Router();

// const calculateDrugActivity = (quantity, ddd) => {
//     const drugActivity = quantity / ddd;
//     return drugActivity;
// };

router.post('/supl', async (req, res) => {
    try {
        const data = req.body.payload;
        supl_post.insertOne(data, (err) => {
            console.log(err);
        });
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/pres', async (req, res) => {
    try {
        const data = req.body.payload;
        pres_post.insertOne(data, (err) => {
            console.log(err);
        });
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/disp', async (req, res) => {
    try {
        const data = req.body.payload;
        disp_post.insertOne(data, (err) => {
            console.log(err);
        });
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
