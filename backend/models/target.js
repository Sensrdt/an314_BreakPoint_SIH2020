const { Schema, model } = require('mongoose');

const targetInfo = new Schema({
    id: {
        type: 'String',
    },
    dname: {
        type: 'String',
    },
    organism: {
        type: 'String',
    },
    actions: {
        action: {
            type: ['String'],
        },
    },
    references: {
        articles: {
            article: {
                type: ['Mixed'],
            },
        },
        textbooks: {
            type: 'Mixed',
        },
        links: {
            type: 'Mixed',
        },
        attachments: {
            attachment: {
                type: ['Mixed'],
            },
        },
    },
    'known-action': {
        type: 'String',
    },
    polypeptide: {
        type: ['Mixed'],
    },
});

const target = model('TargetInfo', targetInfo, 'targetinfo');

module.exports = target;
