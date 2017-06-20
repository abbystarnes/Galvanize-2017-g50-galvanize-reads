exports.up = function(knex, Promise) {
  return knex.schema.createTable('books_authors', (table) => {
    table.increments();
    table.integer('authors_id')
      .references('id')
      .inTable('authors')
      .onDelete('CASCADE');
    table.integer('books_id')
      .references('id')
      .inTable('books')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books_authors');
};
