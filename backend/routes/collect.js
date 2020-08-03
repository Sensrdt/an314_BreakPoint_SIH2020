const { Router } = require('express');
const SuplPost = require('../models/post/supl_post');
const PresPost = require('../models/post/pres_post');
const DispPost = require('../models/post/disp_post');
const Results = require('../models/results');
const states = require('../constants/states_uts');
const ages = require('../constants/age_groups');
const router = new Router();

router.post('/supl', async (req, res) => {
    try {
        const data = new SuplPost(req.body.payload);
        data.save((err) => {
            console.log(err);
        });

        const {
            dosage: { strength },
            quantity: { amount, sub_amount },
        } = data;
        const drugActivity = amount * sub_amount * strength;
        Results.findOne({ drugName: data.drug }, (err, result) => {
            if (err) {
                // create a new result document
                const emptyResult = new Results({
                    drugName: data.drug,
                    sourceDrugActivity: {
                        supplier: 0,
                        prescriber: 0,
                        dispenser: 0,
                    },
                    stateDrugActivity: Array(states.length).fill(0),
                    ageDrugActivity: Array(ages.length).fill(0),
                });
                Results.insertOne(emptyResult, (err) => {
                    if (err) {
                        res.status(500).send();
                    }
                });
            } else {
                result.sourceDrugActivity.supplier += drugActivity;
                result.save((err) => {
                    if (err) {
                        res.status(404).send();
                    }
                });
            }
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

        const {
            duration,
            dosage: { strength },
        } = data;
        const drugActivity = duration * strength;
        Results.findOne({ drugName: data.drug }, (err, result) => {
            if (err) {
                // create a new result document
                const emptyResult = new Results({
                    drugName: data.drug,
                    sourceDrugActivity: {
                        supplier: 0,
                        prescriber: 0,
                        dispenser: 0,
                    },
                    stateDrugActivity: Array(states.length).fill(0),
                    ageDrugActivity: Array(ages.length).fill(0),
                });
                Results.insertOne(emptyResult, (err) => {
                    if (err) {
                        res.status(500).send();
                    }
                });
            }
            result.sourceDrugActivity.prescriber += drugActivity;
            const stateIndex = states.indexOf(data.location);
            if (stateIndex !== -1) {
                result.stateDrugActivity[stateIndex] += drugActivity;
            }
            const ageIndex = ages.indexOf(data.ageGroup);
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

        const {
            dosage: { strength },
            quantity: { amount, sub_amount },
        } = data;
        const drugActivity = amount * sub_amount * strength;
        Results.findOne({ drugName: data.drug }, (err, result) => {
            if (err) {
                // create a new result document
                const emptyResult = new Results({
                    drugName: data.drug,
                    sourceDrugActivity: {
                        supplier: 0,
                        prescriber: 0,
                        dispenser: 0,
                    },
                    stateDrugActivity: Array(states.length).fill(0),
                    ageDrugActivity: Array(ages.length).fill(0),
                });
                Results.insertOne(emptyResult, (err) => {
                    if (err) {
                        res.status(500).send();
                    }
                });
            }
            result.sourceDrugActivity.dispenser += drugActivity;
            const stateIndex = states.indexOf(data.location);
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
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;
