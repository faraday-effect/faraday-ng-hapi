'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class CurrentClass extends Model {
    static get tableName() { return 'current_class'; }

    static get relationMappings() {
        return {
            actualClass: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/ActualClass',
                join: {
                    from: 'current_class.actual_class_id',
                    to: 'actualClass.id'
                }
            },
            section: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'current_class.section_id',
                    to: 'section.id'
                }
            }
        }
    }
}

module.exports = CurrentClass;
