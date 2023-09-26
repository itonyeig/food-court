import { Model } from 'objection';
import Meal from '../../modules/meal/meal.model';

class Brand extends Model {
  static tableName = 'brands';

  id: string;
  name: string;

  created_at?: Date;
  updated_at?: Date;

  static relationMappings = {
    meals: {
      relation: Model.HasManyRelation,
      modelClass: () => Meal,
      join: {
        from: 'brands.id',
        to: 'meals.brand_id',
      },
    },
  };
}

export default Brand;
