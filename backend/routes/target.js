const { Router } = require('express');
const Target = require('../models/target');
const router = new Router();

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    try {
        Target.findOne({ id }, (err, doc) => {
            if (err || !doc) return res.sendStatus(404);
            console.log(doc);
            res.send(doc);
        });
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/find', async (req, res) => {
    const name = req.query.name;
    try {
        Target.find(
            {
                $or: [
                    {
                        dname: {
                            $regex: new RegExp(name, 'i'),
                        },
                    },
                    {
                        organism: {
                            $regex: new RegExp(name, 'i'),
                        },
                    },
                ],
            },
            (err, doc) => {
                if (err || doc == null) return res.sendStatus(404);
                console.log(doc);
                res.send(doc);
            },
        );
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/list', async (req, res) => {
    try {
        Target.find({}, { id: 1, dname: 1, organism: 1 }, (err, doc) => {
            if (err || doc == null) return res.sendStatus(404);
            console.log(doc);
            res.send(doc);
        }).sort({ name: 1 });
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
