'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Actual_Class extends Model {
    static get tableName() { return 'actual_class'; }

    static get relationMappings() {
        return {
            section: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'actual_class.section_id',
                    to: 'section.id'
                }
            },
            current_class: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'actual_class.id',
                    to: 'section.current_class'
                }
            }
        }
    }
}

module.exports = Actual_Class;
