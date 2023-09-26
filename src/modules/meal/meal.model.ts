import { Model } from 'objection';
import Brand from '../brand/brand.model';
import Addon from '../addon/addon.model';
import CalculatedOrder from '../calculated-order/calculated-order.model';

class Meal extends Model {
  static tableName = 'meals';

  id: string;
  new: boolean;
  name: string;
  brand_id: string;
  active: boolean;
  amount: number;
  images: Array<string>;
  alcohol: boolean;
  item_no: string | null;
  summary: string | null;
  calories: string;
  is_addon: boolean;
  is_combo: boolean;
  position: number;
  quantity: number;
  home_page: boolean;
  item_type: string;
  meal_tags: Array<string>;
  created_at: Date;
  is_deleted: boolean;
  order_note: string;
  updated_at: Date;
  description: string;
  minimum_age: number;
  posist_data: object;
  available_no: number;
  meal_keywords: Array<string>;
  internal_profit: number;
  meal_category_id: string;

  static relationMappings = {
    brand: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => Brand,
      join: {
        from: 'meals.brand_id',
        to: 'brands.id',
      },
    },
    addons: {
      relation: Model.HasManyRelation,
      modelClass: () => Addon,
      join: {
        from: 'meals.id',
        to: 'addons.meal_id',
      },
    },
    calculatedOrders: {
      relation: Model.ManyToManyRelation,
      modelClass: () => CalculatedOrder,
      join: {
        from: 'meals.id',
        through: {
          from: 'calculated_order_meals.meal_id',
          to: 'calculated_order_meals.calculated_order_id',
        },
        to: 'calculated_orders.id',
      },
    },
  };
}

export default Meal;
