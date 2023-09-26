import { IsString, IsNumber, IsDate, IsInt } from 'class-validator';

export class CreateAddonDto {
  @IsNumber()
  amount: number;

  @IsInt()
  meal_id: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsString()
  meal_addon_id: string;

  @IsNumber()
  internal_profit: number;

  @IsNumber()
  min_selection_no: number;

  @IsString()
  meal_addon_category_id: string;
}
