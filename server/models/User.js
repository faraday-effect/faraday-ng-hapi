'use strict';

const Model = require('objection').Model;
const db = require('../db');

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get relationMappings() {
        return {
            roles: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Role',
                join: {
                    from: 'user.id',
                    through: {
                        from: 'user_role.user_id',
                        to: 'user_role.role_id'
                    },
                    to: 'role.id'
                }
            },
            offering: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Offering',
                join: { 
                    from: 'user.id',
                    through: {
                        from: 'user_offering.user_id',
                        to: 'user_offering.offering_id',
                        extra: ['relationship_type_id']
                    },
                    to: 'offering.id'
                }
            },
            section: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'user.id',
                    through: {
                        from: 'user_section.user_id',
                        to: 'user_section.section_id',
                        extra: ['relationship_type_id']
                    },
                    to: 'section.id'
                }
            },
            departmentMember: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Department',
                join: {
                    from: 'user.id',
                    through: {
                        from: 'department_member.user_id',
                        to: 'department_member.department_id'
                    },
                    to: 'department.id'
                }
            },
            departmentChair: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Department',
                join: {
                    from: 'user.id',
                    through: {
                        from: 'department_chair.user_id',
                        to: 'department_chair.department_id'
                    },
                    to: 'department.id'
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

module.exports = User;
