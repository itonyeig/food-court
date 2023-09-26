import { IsString, IsNumber, IsDate, IsArray } from 'class-validator';

export class CreateAddonDto {
  @IsString()
  id: string;

  @IsNumber()
  amount: number;

  @IsString()
  meal_id: string;

  @IsArray()
  @IsString({ each: true })
  meal_data_ids: string[];

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsString()
  meal_addon_id: string;

  @IsNumber()
  internal_profit: number;

  @IsString()
  min_selection_no: string;

  @IsString()
  meal_addon_category_id: string;
}
