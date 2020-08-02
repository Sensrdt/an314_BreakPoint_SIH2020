const { Schema, model } = require('mongoose');

const schema = new Schema({
    drug: {
        type: String,
        required: true,
    },
    dosage: {
        form: {
            type: String,
            required: true,
        },
        route: {
            type: String,
            required: true,
        },
        strength: {
            type: String,
            required: true,
        },
    },
    target: {
        type: String,
        required: true,
    },
    ageGroup: {
        type: String,
        enum: ['0-2', '3-16', '17-30', '31-45', '46+'],
        required: true,
    },
    duration: {
        type: Number,
    },
    location: {
        type: String,
        enum: [
            'Andhra Pradesh',
            'Arunachal Pradesh',
            'Assam',
            'Bihar',
            'Chhattisgarh',
            'Goa',
            'Gujarat',
            'Haryana',
            'Himachal Pradesh',
            'Jharkhand',
            'Karnataka',
            'Kerala',
            'Madhya Pradesh',
            'Maharashtra',
            'Manipur',
            'Meghalaya',
            'Mizoram',
            'Nagaland',
            'Odisha',
            'Punjab',
            'Rajasthan',
            'Sikkim',
            'Tamil Nadu',
            'Telangana',
            'Tripura',
            'Uttarakhand',
            'Uttar Pradesh',
            'West Bengal',
            'Andaman and Nicobar Islands',
            'Chandigarh',
            'Dadra and Nagar Haveli',
            'Daman & Diu',
            'The Government of NCT of Delhi',
            'Jammu & Kashmir',
            'Ladakh',
            'Lakshadweep',
            'Puducherry',
        ],
        required: true,
    },
});

const Data = model('data_pres', schema, 'data_pres');

module.exports = Data;
