import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('calculated_orders', (table) => {
    table.increments('id').primary();
    table.string('total_amount');
    table.boolean('free_delivery').defaultTo(false);
    table.string('delivery_fee');
    table.string('service_charge');
    table.json('address_details');
    table.string('lat');
    table.string('lng');
    table.string('cokitchen_polygon_id');
    table.string('user_id'); 
    table.string('cokitchen_id'); 
    table.boolean('pickup').defaultTo(false);
    table.string('prev_price');

    table.specificType('meal_ids', 'integer[]');


    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('calculated_orders');
};
