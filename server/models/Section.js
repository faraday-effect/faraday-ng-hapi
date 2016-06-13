'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Section extends Model {
    static get tableName() { return 'section'; }

    static get relationMappings() {
        return {
            students: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'section.id',
                    through: {
                        from: 'student.section_id',
                        to: 'student.user_id'
                    },
                    to: 'user.id'
                }
            },
            offering: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'section.offering_id',
                    to: 'offering.id'
                }
            },
            actualClasses: {
                relation: Model.OneToManyRelation,
                modelClass: __dirname + '/ActualClass',
                join: {
                    from: 'section.id',
                    to: 'actual_class.section_id'
                }
            }
        }
    }
}

module.exports = Section;
