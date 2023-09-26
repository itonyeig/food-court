import { IsString, IsBoolean, IsOptional } from 'class-validator';

// export class MealDto {
//   @IsString()
//   id: string;

//   @IsBoolean()
//   new: boolean;

//   @IsString()
//   name: string;

//   @IsBoolean()
//   active: boolean;

//   @IsString()
//   amount: string;

//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => AddonDto)
//   addons: AddonDto[];
// }

// export class AddonDto {
//   @IsString()
//   id: string;

//   @IsString()
//   amount: string;

//   @IsString()
//   meal_id: string;

//   @IsBoolean()
//   is_combo: boolean;
// }

// export class OrderTypeDto {
//   @IsString()
//   id: string;

//   @IsString()
//   name: string;
// }

export class CreateOrderDto {
  @IsString()
  user_id: string;

  @IsBoolean()
  completed: boolean;

  @IsBoolean()
  cancelled: boolean;

  @IsBoolean()
  kitchen_cancelled: boolean;

  @IsBoolean()
  kitchen_accepted: boolean;

  @IsBoolean()
  kitchen_dispatched: boolean;

  @IsOptional()
  @IsString()
  kitchen_dispatched_time?: string;

  @IsString()
  rider_id: string;

  @IsBoolean()
  kitchen_prepared: boolean;

  @IsBoolean()
  rider_assigned: boolean;

  @IsBoolean()
  paid: boolean;

  @IsString()
  order_code: string;

  @IsOptional()
  @IsString()
  box_number?: string;

  @IsBoolean()
  shop_accepted: boolean;

  @IsBoolean()
  shop_prepared: boolean;

  @IsBoolean()
  rider_started: boolean;

  @IsBoolean()
  rider_arrived: boolean;

  @IsBoolean()
  is_failed_trip: boolean;

  @IsOptional()
  @IsString()
  failed_trip_details?: string;

  @IsBoolean()
  scheduled: boolean;

  // Reference to CalculatedOrder
  @IsString()
  calculated_order_id: string;

  // Reference to OrderType
  @IsString()
  order_type_id: string;
}
