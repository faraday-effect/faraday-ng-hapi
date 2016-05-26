//temp key


exports.seed = function (knex, Promise) {
    var key = {};
    Promise.join(
        // Deletes ALL existing entries
        knex('section').del(),
        knex('department_prefix').del(),
        knex('course').del(),
        knex('department').del(),
        knex('prefix').del(),
        knex('term').del()
    ).then(
        () => {
            console.log("I deleted");
        }
    );

    Promise.join(
        //Inserts seed entries
        knex('department').returning('id').insert({name: 'Computer Science'}).then((ids) => {
            key['d1'] = ids[0];
        }),
        knex('department').returning('id').insert({name: 'Mathematics'}).then((ids) => {
            key['d2'] = ids[0];
        }),
        knex('department').returning('id').insert({name: 'Biblical Studies, Christian Education, & Philosophy'}).then((ids) => {
            key['d3'] = ids[0];
        }),

        knex('prefix').returning('id').insert({name: 'COS'}).then((ids) => {
            key['p1'] = ids[0];
        }),
        knex('prefix').returning('id').insert({name: 'MAT'}).then((ids) => {
            key['p2'] = ids[0];
        }),
        knex('prefix').returning('id').insert({name: 'BIB'}).then((ids) => {
            key['p3'] = ids[0];
        }),
        knex('prefix').returning('id').insert({name: 'REL'}).then((ids) => {
            key['p4'] = ids[0];
        }),
        knex('prefix').returning('id').insert({name: 'PHI'}).then((ids) => {
            key['p5'] = ids[0];
        }),

        knex('term').returning('id').insert({
            name: 'Fall 2016',
            start_date: "2016-09-01",
            end_date: "2016-12-01"
        }).then((ids) => {
            key['t1'] = ids[0];
        }),
        knex('term').returning('id').insert({
            name: 'Fall 2017',
            start_date: "2017-09-01",
            end_date: "2017-12-01"
        }).then((ids) => {
            key['t2'] = ids[0];
        }),
        knex('term').returning('id').insert({
            name: 'Spring 2016',
            start_date: "2016-01-01",
            end_date: "2016-05-01"
        }).then((ids) => {
            key['t3'] = ids[0];
        }),
        knex('term').returning('id').insert({
            name: 'Spring 2017',
            start_date: "2016-01-01",
            end_date: "2016-05-01"
        }).then((ids) => {
            key['t4'] = ids[0];
        })
    ).then(() => {
        console.log("I reached here");
        Promise.join(
            knex('department_prefix').insert({prefix_id: key['p1'], department_id: key['d1']}),
            knex('department_prefix').insert({prefix_id: key['p2'], department_id: key['d1']}),
            knex('department_prefix').insert({prefix_id: key['p3'], department_id: key['d3']}),
            knex('department_prefix').insert({prefix_id: key['p4'], department_id: key['d3']}),
            knex('department_prefix').insert({prefix_id: key['p5'], department_id: key['d3']}),

            knex('course').returning('id').insert({
                prefix_id: key['p1'],
                department_id: key['d1'],
                number: "121",
                title: "Foundations of Computer Science",
                "active": false
            }).then((ids) => {
                key['c1'] = ids[0];
            }),

            knex('course').returning('id').insert({
                prefix_id: key['p1'],
                department_id: key['d1'],
                number: "243",
                title: "Multi-Tier Web Applications",
                "active": false
            }).then((ids) => {
                key['c2'] = ids[0];
            }),

            knex('course').returning('id').insert({
                prefix_id: key['p2'],
                department_id: key['d2'],
                number: "210",
                title: "Statistics",
                "active": true
            }).then((ids) => {
                key['c3'] = ids[0];
            }),

            knex('course').returning('id').insert({
                prefix_id: key['p3'],
                department_id: key['d3'],
                number: "110",
                title: "Biblical Literature I",
                "active": true
            }).then((ids) => {
                key['c4'] = ids[0];
            }),

            knex('course').returning('id').insert({
                prefix_id: key['p3'],
                department_id: key['d3'],
                number: "210",
                title: "Biblical Literature II",
                "active": true
            }).then((ids) => {
                key['c5'] = ids[0];
            }),

            knex('course').returning('id').insert({
                prefix_id: key['p4'],
                department_id: key['d3'],
                number: "313",
                title: "Historic Christian Belief",
                "active": false
            }).then((ids) => {
                key['c6'] = ids[0];
            }),

            knex('course').returning('id').insert({
                prefix_id: key['p5'],
                department_id: key['d3'],
                number: "413",
                title: "Contemporary Christian Belief",
                "active": false
            }).then((ids) => {
                key['c7'] = ids[0];
            })
        ).then(
            () => {
                console.log("");
            }
        );
    });

    return Promise.join(
        knex('section').insert({course_id: key['c1'], term_id: key['t1'], reg_number: "123456", title: "Class 1"}),
        knex('section').insert({course_id: key['c2'], term_id: key['t1'], reg_number: "234567", title: "Class 1"}),
        knex('section').insert({course_id: key['c3'], term_id: key['t1'], reg_number: "345678", title: "Class 1"}),
        knex('section').insert({course_id: key['c4'], term_id: key['t1'], reg_number: "456789", title: "Class 1"}),
        knex('section').insert({course_id: key['c5'], term_id: key['t1'], reg_number: "987654", title: "Class 1"}),
        knex('section').insert({course_id: key['c6'], term_id: key['t1'], reg_number: "876543", title: "Class 1"}),
        knex('section').insert({course_id: key['c7'], term_id: key['t1'], reg_number: "765432", title: "Class 1"}),
        knex('section').insert({course_id: key['c4'], term_id: key['t1'], reg_number: "654321", title: "Class 2"}),
        knex('section').insert({course_id: key['c5'], term_id: key['t1'], reg_number: "098765", title: "Class 2"}),
        knex('section').insert({course_id: key['c2'], term_id: key['t1'], reg_number: "012345", title: "Class 2"}),
        knex('section').insert({course_id: key['c6'], term_id: key['t2'], reg_number: "123987", title: "Class 1"}),
        knex('section').insert({course_id: key['c6'], term_id: key['t2'], reg_number: "987123", title: "Class 2"})
    );
};
