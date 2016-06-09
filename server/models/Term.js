'use strict';

const db = require('./../db')

class Term extends db.Model {
    static get tableName() {
        return 'term';
    }

    static get relationMappings() {
        return {
            offerings: {
                relation: db.Model.OneToManyRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'term.id',
                    to: 'offering.term_id'
                }
            }
        }
    }
}

module.exports = Term;

