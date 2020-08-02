const { Schema, model } = require('mongoose');

const schema = new Schema({
    drug: {
        type: 'String',
        required: true,
    },
    dosage: {
        type: {
            form: {
                type: 'String',
            },
            strength: {
                type: 'String',
            },
        },
        required: true,
    },
    quantity: {
        type: {
            amount: 'Number',
            sub_amount: 'Number',
            scale: 'String',
        },
        required: true,
    },
    location: {
        type: 'String',
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

const Data = model('data_disp', schema, 'data_disp');

module.exports = Data;
