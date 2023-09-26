export class CreateMealDto {}
import {
  IsString,
  IsBoolean,
  IsArray,
  IsNumber,
  IsDate,
  IsOptional,
  IsInt,
} from 'class-validator';

export class MealDTO {
  @IsBoolean()
  new: boolean;

  @IsString()
  name: string;

  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  addons: number[];

  @IsString()
  amount: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsBoolean()
  alcohol: boolean;

  @IsOptional()
  @IsString()
  item_no?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsInt()
  brand_id: number;

  @IsOptional()
  @IsString()
  calories?: string;

  @IsBoolean()
  is_addon: boolean;

  @IsBoolean()
  is_combo: boolean;

  @IsNumber()
  position: number;

  @IsNumber()
  quantity: number;

  @IsBoolean()
  home_page: boolean;

  @IsString()
  item_type: string;

  @IsArray()
  @IsString({ each: true })
  meal_tags: string[];

  @IsDate()
  created_at: Date;

  @IsBoolean()
  is_deleted: boolean;

  @IsOptional()
  @IsString()
  order_note?: string;

  @IsDate()
  updated_at: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  minimum_age: string;

  @IsOptional()
  @IsString()
  available_no?: string;

  @IsArray()
  @IsString({ each: true })
  meal_keywords: string[];

  @IsNumber()
  internal_profit: number;

  @IsString()
  meal_category_id: string;
}
