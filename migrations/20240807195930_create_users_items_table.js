/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('users', function(table) {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
  })
  .createTable('items', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('users.id');
    table.string('item_name').notNullable();
    table.text('description');
    table.integer('quantity').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('items')
  
};
