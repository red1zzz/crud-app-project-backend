/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del();
  await knex('users').del();
  
  await knex('users').insert([
    {id: 1, first_name: 'Bob', last_name: 'Sagot', username: 'sagotbob', password: 'password1'},
    {id: 2, first_name: 'Jackie', last_name: 'Chan', username: 'chanjackie', password: 'password2'}
  ]);

  await knex('items').insert([
    {user_id: 1, item_name: 'pencil', description: 'for drawing', quantity: 5},
    {user_id: 1, item_name: 'pen', description: 'for permanent drawing', quantity: 10},
    {user_id: 2, item_name: 'paper', description: 'for writing', quantity: 7}
  ]);
};
