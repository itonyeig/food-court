import { IsString, IsNumber, IsDate, IsInt, Min } from 'class-validator';

export class CreateAddonDto {
  @IsNumber()
  amount: number;

  @IsInt()
  @Min(1)
  meal_id: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsString()
  meal_addon_id: string;

  @IsNumber()
  @Min(1)
  internal_profit: number;

  @IsNumber()
  @Min(1)
  min_selection_no: number;

  @IsString()
  meal_addon_category_id: string;
}
