'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class UserRelationship extends Model {
    static get tableName() {
        return 'user_relationship';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'user_relationship.id',
                    to: 'user.id'
                },
            }
        }
    }
}

module.exports = UserRelationship;
