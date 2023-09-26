import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('calculated_order_meals', (table) => {
    table
      .integer('calculated_order_id')
      .unsigned()
      .references('id')
      .inTable('calculated_orders')
      .onDelete('CASCADE');
    table
      .integer('meal_id')
      .unsigned()
      .references('id')
      .inTable('meals')
      .onDelete('CASCADE');
    table.primary(['calculated_order_id', 'meal_id']); // Composite primary key
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('calculated_order_meals');
};
