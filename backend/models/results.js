const { Schema, model } = require('mongoose');

// stateDrugActivity[states.indexOf(stateName)] += dda;

const resultSchema = new Schema({
    drugbankId: {
        type: String,
        required: true,
    },
    drugName: {
        type: String,
        required: true,
    },
    sourceDrugActivity: {
        supplier: {
            type: Number,
            default: 0,
        },
        prescriber: {
            type: Number,
            default: 0,
        },
        dispenser: {
            type: Number,
            default: 0,
        },
    },
    stateDrugActivity: {
        type: [Number],
    },
    ageDrugActivity: {
        type: [Number],
    },
});

const Results = model('Result', resultSchema);

module.exports = Results;
