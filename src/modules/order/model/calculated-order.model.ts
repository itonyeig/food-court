import { Model } from 'objection';

class CalculatedOrder extends Model {
  static tableName = 'calculated_orders';

  id: string;
  total_amount: string;
  free_delivery: boolean;
  delivery_fee: string;
  service_charge: string;
  address_details: {
    time: Date;
    city: string;
    name: string;
    address_line: string;
    building_number: string;
  };
  lat: string;
  lng: string;
  cokitchen_polygon_id: string;
  user_id: string;
  cokitchen_id: string;
  pickup: boolean;
  prev_price: string;

  static relationMappings = {
    order: {
      relation: Model.HasOneRelation,
      modelClass: 'Order',
      join: {
        from: 'calculated_orders.id',
        to: 'orders.calculated_order_id',
      },
    },
    meals: {
      relation: Model.HasManyRelation,
      modelClass: 'Meal',
      join: {
        from: 'calculated_orders.id',
        to: 'meals.calculated_order_id',
      },
    },
  };
}

export default CalculatedOrder;
