'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Person extends Model {
    static get tableName() {
        return 'person';
    }

    static get relationMappings() {
        return {
            student_sections: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'person.id',
                    through: {
                        from: 'student.person_id',
                        to: 'student.section_id'
                    },
                    to: 'section.id'
                }
            }
        }
    }

    fullName() {
        return this.firstName + ' ' + this.lastName
    }

    stripPassword() {
        delete this['password']
        return this;
    }
}

module.exports = Person;
