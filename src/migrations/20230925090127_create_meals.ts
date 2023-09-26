import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('meals', (table) => {
    table.increments('id').primary();
    table.boolean('new').defaultTo(false);
    table.string('name').notNullable();
    table.boolean('active').defaultTo(true);
    table.decimal('amount', 10, 2);
    table.text('images', 'text[]');
    table.boolean('alcohol').defaultTo(false);
    table.string('item_no').nullable();
    table.string('summary').nullable();
    table.string('calories').notNullable();
    table.boolean('is_addon').defaultTo(false);
    table.boolean('is_combo').defaultTo(false);
    table.integer('position').notNullable();
    table.integer('quantity').notNullable();
    table.boolean('home_page').defaultTo(false);
    table.string('item_type').notNullable();
    table.text('meal_tags', 'text[]');
    table.boolean('is_deleted').defaultTo(false);
    table.string('order_note').notNullable();
    table.string('description').notNullable();
    table.integer('minimum_age');
    table.text('posist_data', 'text[]');
    table.string('available_no');
    table.text('meal_keywords', 'text[]');
    table.decimal('internal_profit', 10, 2);
    table.string('meal_category_id');

    table.timestamps(true, true);


    table.integer('brand_id').references('id').inTable('brands').onDelete('CASCADE');

  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('meals');
};
