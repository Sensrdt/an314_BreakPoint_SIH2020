const { Router } = require('express');
const supl_post = require('../models/post/supl_post');
const pres_post = require('../models/post/pres_post');
const disp_post = require('../models/post/disp_post');
const results = require('../models/results');
const states = require('../constants/states_uts');
const ages = require('../constants/age_groups');
const router = new Router();

router.post('/supl', async (req, res) => {
    try {
        const data = req.body.payload;
        supl_post.insertOne(data, (err) => {
            console.log(err);
        });

        const {
            dosage: { strength },
            quantity: { amount, sub_amount },
        } = data;
        const drugActivity = amount * sub_amount * strength;
        results.findOne({ drugName: data.drug }, (err, result) => {
            if (err) {
                res.status(404).send();
            }
            result.sourceDrugActivity.supplier += drugActivity;
            result.save((err) => {
                if (err) {
                    res.status(404).send();
                }
            });
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

        const {
            duration,
            dosage: { strength },
        } = data;
        const drugActivity = duration * strength;
        results.findOne({ drugName: data.drug }, (err, result) => {
            if (err) {
                res.status(404).send();
            }
            result.sourceDrugActivity.prescriber += drugActivity;
            let stateIndex = states.indexOf(data.location);
            if (stateIndex !== -1) {
                result.stateDrugActivity[stateIndex] += drugActivity;
            }
            let ageIndex = ages.indexOf(data.ageGroup);
            if (ageIndex !== -1) {
                result.ageDrugActivity[ageIndex] += drugActivity;
            }
            result.save((err) => {
                if (err) {
                    res.status(404).send();
                }
            });
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

        const {
            dosage: { strength },
            quantity: { amount, sub_amount },
        } = data;
        const drugActivity = amount * sub_amount * strength;
        results.findOne({ drugName: data.drug }, (err, result) => {
            if (err) {
                res.status(404).send();
            }
            result.sourceDrugActivity.dispenser += drugActivity;
            let stateIndex = states.indexOf(data.location);
            if (stateIndex !== -1) {
                result.stateDrugActivity[stateIndex] += drugActivity;
            }
            result.save((err) => {
                if (err) {
                    res.status(404).send();
                }
            });
        });
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
