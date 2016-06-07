
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('attendance', function (table) {
            table.dateTime('signed_in'),
                table.dateTime('signed_out')
        }),

        knex.schema.table('actual_class', function (table) {
            table.dateTime('start_time'),
                table.dateTime('stop_time'),
                table.dropColumn('date'),
                table.dropColumn('sequence')
        }),

        knex.schema.table('section', function (table) {
            table.integer('current_class')
                .references('id')
                .inTable('actual_class')
        })
    ])
};

exports.down = function (knex, Promise) {

};
