exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', (table) => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('biography');
    table.string('portrait_url');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
