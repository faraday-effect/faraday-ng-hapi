var Schema = {
    department: {
        id: {type: 'increments', nullable: false, primary: true},
        name: {type: 'string'}
    },

    course: {
        id: {type: 'increments', nullable: false, primary: true},
        prefix: {type: 'string', nullable: false},
        number: {type: 'string', nullable: false},
        title: {type: 'string'},
        active: {type: 'boolean'},
        department_id: {type: 'integer', nullable: false, unsigned: true}
    },

    section: {
        id: {type: 'increments', nullable: false, primary: true},
        course_id: {type: 'integer', nullable: false, unsigned: true},
        term_id: {type: 'integer', nullable: false, unsigned: true},
        reg_number: {type: 'string', nullable: false},
        title: {type: 'string'}
    },

    term: {
        id: {type: 'increments', nullable: false, primary: true},
        name: {type: 'string', nullable: false},
        start_date: {type: "date", nullable: false},
        end_date: {type: "date", nullable: false}
    }
};

module.exports = Schema;