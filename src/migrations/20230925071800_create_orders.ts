import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.string('user_id');
    table.boolean('completed').defaultTo(false);
    table.boolean('cancelled').defaultTo(false);
    table.boolean('kitchen_cancelled').defaultTo(false);
    table.boolean('kitchen_accepted').defaultTo(false);
    table.boolean('kitchen_dispatched').defaultTo(false);
    table.timestamp('kitchen_dispatched_time').nullable();
    table.timestamp('completed_time').nullable();
    table.string('rider_id');
    table.boolean('kitchen_prepared').defaultTo(false);
    table.boolean('rider_assigned').defaultTo(false);
    table.boolean('paid').defaultTo(false);
    table.string('order_code');
    table.jsonb('order_change').nullable();
    table.timestamp('kitchen_verified_time').nullable();
    table.timestamp('kitchen_completed_time').nullable();
    table.boolean('shop_accepted').defaultTo(false);
    table.boolean('shop_prepared').defaultTo(false);
    table.integer('no_of_mealbags_delivered');
    table.integer('no_of_drinks_delivered');
    table.timestamp('rider_started_time').nullable();
    table.boolean('rider_started').defaultTo(false);
    table.timestamp('rider_arrived_time').nullable();
    table.boolean('rider_arrived').defaultTo(false);
    table.boolean('is_failed_trip').defaultTo(false);
    table.jsonb('failed_trip_details').nullable();
    table.string('box_number');
    table.string('shelf_id').nullable();
    table.boolean('scheduled').defaultTo(false);
    table.string('confirmed_by_id').nullable();
    table.string('completed_by_id').nullable();
    table.timestamp('scheduled_delivery_date').nullable();
    table.timestamp('scheduled_delivery_time').nullable();
    table.boolean('is_hidden').defaultTo(false);

    table.timestamps(true, true);

    
    table.integer('calculated_order_id').references('id').inTable('calculated_orders').onDelete('CASCADE');
    table.integer('order_type_id').references('id').inTable('order_types').onDelete('CASCADE');
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('orders');
};
