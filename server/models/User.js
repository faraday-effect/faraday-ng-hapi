'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get relationMappings() {
        return {
            role: {
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
                        from: 'user_relationship.user_id',
                        to: 'user_relationship.offering_id',
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
                        from: 'user_relationship.user_id',
                        to: 'user_relationship.section_id',
                        extra: ['relationship_type_id']
                    },
                    to: 'section.id'
                }
            },
            userRelationship: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/UserRelationship',
                join: {
                    from: 'user.id',
                    to: 'user_relationship.user_id'
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
