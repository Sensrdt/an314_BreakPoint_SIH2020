const { Schema, model } = require('mongoose');

const drugInfo = new Schema({
    _type: {
        type: 'String',
    },
    _created: {
        type: 'Date',
    },
    _updated: {
        type: 'Date',
    },
    drugbank_id: {
        type: 'String',
    },
    name: {
        type: 'String',
    },
    description: {
        type: 'String',
    },
    cas_number: {
        type: 'String',
    },
    unii: {
        type: 'String',
    },
    average_mass: {
        $numberDouble: {
            type: 'String',
        },
    },
    monoisotopic_mass: {
        $numberDouble: {
            type: 'String',
        },
    },
    state: {
        type: 'String',
    },
    groups: {
        group: {
            type: ['String'],
        },
    },
    general_references: {
        articles: {
            article: {
                type: ['Mixed'],
            },
        },
        textbooks: {
            type: 'Mixed',
        },
        links: {
            link: {
                type: ['Mixed'],
            },
        },
        attachments: {
            attachment: {
                type: ['Mixed'],
            },
        },
    },
    synthesis_reference: {
        type: 'String',
    },
    indication: {
        type: 'String',
    },
    pharmacodynamics: {
        type: 'String',
    },
    mechanism_of_action: {
        type: 'String',
    },
    toxicity: {
        type: 'String',
    },
    metabolism: {
        type: 'String',
    },
    absorption: {
        type: 'String',
    },
    half_life: {
        type: 'String',
    },
    protein_binding: {
        type: 'String',
    },
    route_of_elimination: {
        type: 'String',
    },
    volume_of_distribution: {
        type: 'String',
    },
    clearance: {
        type: 'String',
    },
    classification: {
        description: {
            type: 'String',
        },
        direct_parent: {
            type: 'String',
        },
        kingdom: {
            type: 'String',
        },
        superclass: {
            type: 'String',
        },
        class: {
            type: 'String',
        },
        subclass: {
            type: 'String',
        },
        alternative_parent: {
            type: ['String'],
        },
        substituent: {
            type: ['String'],
        },
    },
    salts: {
        salt: {
            type: ['Mixed'],
        },
    },
    synonyms: {
        synonym: {
            type: ['Mixed'],
        },
    },
    products: {
        product: {
            type: ['Mixed'],
        },
    },
    international_brands: {
        international_brand: {
            type: ['Mixed'],
        },
    },
    mixtures: {
        mixture: {
            type: ['Mixed'],
        },
    },
    packagers: {
        packager: {
            type: ['Mixed'],
        },
    },
    manufacturers: {
        manufacturer: {
            type: ['Mixed'],
        },
    },
    prices: {
        price: {
            type: ['Mixed'],
        },
    },
    categories: {
        category: {
            type: ['Mixed'],
        },
    },
    affected_organisms: {
        affected_organism: {
            type: ['String'],
        },
    },
    dosages: {
        dosage: {
            type: ['Mixed'],
        },
    },
    atc_codes: {
        atc_code: {
            type: ['Mixed'],
        },
    },
    ahfs_codes: {
        ahfs_code: {
            type: ['String'],
        },
    },
    pdb_entries: {
        pdb_entry: {
            type: ['String'],
        },
    },
    fda_label: {
        type: 'String',
    },
    msds: {
        type: 'String',
    },
    patents: {
        patent: {
            type: ['Mixed'],
        },
    },
    food_interactions: {
        type: 'Mixed',
    },
    drug_interactions: {
        drug_interaction: {
            type: ['Mixed'],
        },
    },
    calculated_properties: {
        property: {
            type: ['Mixed'],
        },
    },
    experimental_properties: {
        property: {
            type: ['Mixed'],
        },
    },
    external_identifiers: {
        external_identifier: {
            type: ['Mixed'],
        },
    },
    external_links: {
        external_link: {
            type: ['Mixed'],
        },
    },
    pathways: {
        pathway: {
            type: ['Mixed'],
        },
    },
    reactions: {
        type: 'Mixed',
    },
    snp_effects: {
        type: 'Mixed',
    },
    snp_adverse_drug_reactions: {
        type: 'Mixed',
    },
    targets: {
        target: {
            type: ['Mixed'],
        },
    },
    enzymes: {
        type: 'Mixed',
    },
    carriers: {
        type: 'Mixed',
    },
    transporters: {
        type: 'Mixed',
    },
});

const Drug = model('DrugInfo', drugInfo, 'druginfo');

module.exports = Drug;
