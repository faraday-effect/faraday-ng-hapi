'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Section extends Model {
    static get tableName() { return 'section'; }

    static get relationMappings() {
        return {
            students: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Person',
                join: {
                    from: 'section.id',
                    through: {
                        from: 'student.section_id',
                        to: 'student.person_id'
                    },
                    to: 'person.id'
                }
            },
            offering: {
                relation: Model.OneToManyRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'section.offering_id',
                    to: 'offering.id'
                }
            }
        }
    }
}

module.exports = Section;
