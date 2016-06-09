'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Person extends Model {
    static get tableName() { return 'person'; }

    fullName() { return this.firstName + ' ' + this.lastName }
    stripPassword() { 
        delete this['password']
        return this;
    }
}

module.exports = Person;
