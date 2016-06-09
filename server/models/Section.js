'use strict';

const Model = require('objection').Model;

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
            }
        }
    }
}

module.exports = Section;
