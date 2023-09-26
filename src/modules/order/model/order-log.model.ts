import { Model } from 'objection';

class OrderLog extends Model {
  static tableName = 'order_logs';

  id: string;
  order_id: string;
  time: Date;
  description: string;

  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Order',
      join: {
        from: 'order_logs.order_id',
        to: 'orders.id',
      },
    },
  };
}

export default OrderLog;
