const { Router } = require('express');
const SuplPost = require('../models/post/supl_post');
const PresPost = require('../models/post/pres_post');
const DispPost = require('../models/post/disp_post');
const Results = require('../models/results');
const states = require('../constants/states_uts');
const ages = require('../constants/age_groups');
const ddd = require('../constants/ddd_offline.json');
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

        const possible_ddd = ddd
            .find((x) => x.name === data.drug)
            .DDDs.reduce((a, b) => {
                if (a === -1 && b.DDD !== -1) return b.DDD;
                else return a;
            }, -1);

        const actual_ddd = possible_ddd === -1 ? 1 : possible_ddd;

        const drugActivity = (amount * sub_amount * strength) / actual_ddd;
        Results.findOne({ drugName: data.drug }, (err, result) => {
            if (!result) {
                // create a new result document
                const emptyResult = new Results({
                    drugName: data.drug,
                    sourceDrugActivity: {
                        supplier: drugActivity,
                        prescriber: 0,
                        dispenser: 0,
                    },
                    stateDrugActivity: Array(states.length).fill(0),
                    ageDrugActivity: Array(ages.length).fill(0),
                });
                emptyResult.save((err) => {
                    if (err) {
                        res.status(500).send();
                    }
                });
                res.status(200).send();
            } else {
                result.sourceDrugActivity.supplier += drugActivity;
                result.save((err) => {
                    if (err) {
                        res.status(404).send();
                    }
                });
                res.status(200).send();
            }
        });
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/pres', async (req, res) => {
    const location = req.user.location
        ? req.user.location
        : 'The Government of NCT of Delhi';

    try {
        const data = new PresPost({ ...req.body.payload, location });
        data.save((err) => {
            console.log(err);
        });

        const {
            duration,
            dosage: { strength },
        } = data;

        const possible_ddd = ddd
            .find((x) => x.name === data.drug)
            .DDDs.reduce((a, b) => {
                if (a === -1 && b.DDD !== -1) return b.DDD;
                else return a;
            }, -1);

        const actual_ddd = possible_ddd === -1 ? 1 : possible_ddd;

        const drugActivity = (duration * strength) / actual_ddd;
        Results.findOne({ drugName: data.drug }, (err, result) => {
            if (!result) {
                // create a new result document
                const stateIndex = states.indexOf(data.location);
                const ageIndex = ages.indexOf(data.ageGroup);
                const emptyResult = new Results({
                    drugName: data.drug,
                    sourceDrugActivity: {
                        supplier: 0,
                        prescriber: drugActivity,
                        dispenser: 0,
                    },
                    stateDrugActivity: Array(states.length).fill(0),
                    ageDrugActivity: Array(ages.length).fill(0),
                });
                emptyResult.stateDrugActivity[stateIndex] += drugActivity;
                emptyResult.ageDrugActivity[ageIndex] += drugActivity;
                emptyResult.save(emptyResult, (err) => {
                    if (err) {
                        res.status(500).send();
                    }
                });
                res.status(200).send();
            } else {
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
                res.status(200).send();
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post('/disp', async (req, res) => {
    const location = req.user.location
        ? req.user.location
        : 'The Government of NCT of Delhi';
    try {
        const data = new DispPost({ ...req.body.payload, location });
        data.save((err) => {
            console.log(err);
        });

        const {
            dosage: { strength },
            quantity: { amount, sub_amount },
        } = data;

        const possible_ddd = ddd
            .find((x) => x.name === data.drug)
            .DDDs.reduce((a, b) => {
                if (a === -1 && b.DDD !== -1) return b.DDD;
                else return a;
            }, -1);

        const actual_ddd = possible_ddd === -1 ? 1 : possible_ddd;

        const drugActivity = (amount * sub_amount * strength) / actual_ddd;
        Results.findOne({ drugName: data.drug }, (err, result) => {
            if (!result) {
                // create a new result document
                const stateIndex = states.indexOf(data.location);
                console.log(stateIndex);
                const emptyResult = new Results({
                    drugName: data.drug,
                    sourceDrugActivity: {
                        supplier: 0,
                        prescriber: 0,
                        dispenser: drugActivity,
                    },
                    stateDrugActivity: Array(states.length).fill(0),
                    ageDrugActivity: Array(ages.length).fill(0),
                });
                emptyResult.stateDrugActivity[stateIndex] += drugActivity;
                emptyResult.save((err) => {
                    if (err) {
                        res.status(500).send();
                    }
                    res.status(200).send();
                });
            } else {
                console.log(result);
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
                res.status(200).send();
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;
