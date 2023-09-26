import { Model } from 'objection';
import Brand from '../brand/brand.model';
import Addon from '../addon/addon.model';

class Meal extends Model {
  static tableName = 'meals';

  id: string;
  new: boolean;
  name: string;
  brand_id: string;
  active: boolean;
  amount: number; // changed from string
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
  minimum_age: number; // changed from string
  posist_data: object;
  available_no: number; // changed from string
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
  };
}

export default Meal;
