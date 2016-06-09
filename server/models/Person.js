'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Person extends Model {
    static get tableName() { return 'person'; }

    fullName() { return this.firstName + ' ' + this.lastName }
    stripPassword() { return {
        'id': this.id,
        'first_name': this.first_name,
        'last_name': this.last_name,
        'email': this.email,
        'office_phone': this.office_phone,
        'mobile_phone': this.mobile_phone
    }}
}

module.exports = Person;
