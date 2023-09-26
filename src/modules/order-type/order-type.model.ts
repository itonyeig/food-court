import { Model } from 'objection';

class OrderType extends Model {
  static tableName = 'order_types';

  id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;

  static relationMappings = {
    orders: {
      relation: Model.HasManyRelation,
      modelClass: 'Order',
      join: {
        from: 'order_types.id',
        to: 'orders.order_type_id',
      },
    },
  };
}

export default OrderType;
