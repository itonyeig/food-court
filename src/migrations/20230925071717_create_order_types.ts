import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('order_types', (table) => {
    table.increments('id').primary();
    table.string('name').unique();

    table.timestamps(true, true);

  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('order_types');
};
