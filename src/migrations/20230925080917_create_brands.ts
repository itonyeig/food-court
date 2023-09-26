import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('brands', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();

    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('brands');
};
