import { Model } from 'objection';
import CalculatedOrder from '../calculated-order/calculated-order.model';
import OrderType from '../order-type/order-type.model';

class Order extends Model {
  static tableName = 'orders';

  id: string;
  user_id: string;
  completed: boolean;
  cancelled: boolean;
  kitchen_cancelled: boolean;
  kitchen_accepted: boolean;
  kitchen_dispatched: boolean;
  kitchen_dispatched_time: Date;
  completed_time: Date;
  rider_id: string;
  kitchen_prepared: boolean;
  rider_assigned: boolean;
  paid: boolean;
  order_code: string;
  order_change: any;
  calculated_order_id: number;
  kitchen_verified_time: Date;
  kitchen_completed_time: Date;
  shop_accepted: boolean;
  shop_prepared: boolean;
  no_of_mealbags_delivered: number;
  no_of_drinks_delivered: number;
  rider_started_time: Date | null;
  rider_started: boolean;
  rider_arrived_time: Date | null;
  rider_arrived: boolean;
  is_failed_trip: boolean;
  failed_trip_details: Record<string, any>;
  box_number: string;
  shelf_id: string | null;
  scheduled: boolean;
  confirmed_by_id: string | null;
  completed_by_id: string | null;
  scheduled_delivery_date: Date | null;
  scheduled_delivery_time: Date | null;
  is_hidden: boolean;
  logs: Array<any>;

  created_at?: Date;
  updated_at?: Date;

  static relationMappings = {
    calculatedOrder: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => CalculatedOrder,
      join: {
        from: 'orders.calculated_order_id',
        to: 'calculated_orders.id',
      },
    },
    orderType: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => OrderType,
      join: {
        from: 'orders.order_type_id',
        to: 'order_types.id',
      },
    },
  };
}

export default Order;
