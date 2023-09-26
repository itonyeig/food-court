import { Model } from 'objection';
import Meal from '../../modules/meal/meal.model';

class Addon extends Model {
  static tableName = 'addons';

  id: string;
  amount: number;
  meal_id: string;
  is_combo: boolean;
  position: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  meal_addon_id: string;
  internal_profit: number;
  min_selection_no: number; // changed from string
  meal_addon_category_id: string;

  static relationMappings = {
    meal: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => Meal,
      join: {
        from: 'addons.meal_id',
        to: 'meals.id',
      },
    },
  };
}

export default Addon;
