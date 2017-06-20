exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', (table) => {
    table.increments();
    table.string('title');
    table.string('genre');
    table.string('description');
    table.string('book_cover_url');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
