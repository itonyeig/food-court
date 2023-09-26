import { Model } from 'objection';
import Order from '../order/order.model';
import Meal from '../meal/meal.model';

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

  created_at?: Date;
  updated_at?: Date;

  static relationMappings = {
    order: {
      relation: Model.HasOneRelation,
      modelClass: () => Order,
      join: {
        from: 'calculated_orders.id',
        to: 'orders.calculated_order_id',
      },
    },
    meals: {
      relation: Model.ManyToManyRelation,
      modelClass: () => Meal,
      join: {
        from: 'calculated_orders.id',
        through: {
          from: 'calculated_order_meals.calculated_order_id',
          to: 'calculated_order_meals.meal_id',
        },
        to: 'meals.id',
      },
    },
  };
}

export default CalculatedOrder;
