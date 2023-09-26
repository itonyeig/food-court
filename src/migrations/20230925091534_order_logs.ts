import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('order_logs', (table) => {
    table.increments('id').primary();
    table.timestamp('time').notNullable();
    table.text('description').notNullable();
    
    table.timestamps(true, true);
    table.integer('order_id').notNullable().references('id').inTable('orders').onDelete('CASCADE');
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('order_logs');
};
