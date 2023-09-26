import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('addons', (table) => {
    table.increments('id').primary();
    table.integer('amount').notNullable();
    table.boolean('is_combo').defaultTo(false);
    table.integer('position');
    table.integer('quantity');
    table.string('meal_addon_id');
    table.integer('internal_profit').defaultTo(0);
    table.integer('min_selection_no').defaultTo(0);
    table.string('meal_addon_category_id');
    
    table.timestamps(true, true);
    
    table.integer('meal_id').references('id').inTable('meals').onDelete('CASCADE');
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('addons');
};
