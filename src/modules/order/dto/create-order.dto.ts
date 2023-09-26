import { IsString, IsBoolean, Min, IsNumber } from 'class-validator';

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

  @IsNumber()
  @Min(1)
  calculated_order_id: number;

  @IsBoolean()
  shop_accepted: boolean;

  @IsBoolean()
  shop_prepared: boolean;

  @IsNumber()
  no_of_mealbags_delivered: number;

  @IsNumber()
  no_of_drinks_delivered: number;

  @IsBoolean()
  rider_started: boolean;

  @IsBoolean()
  rider_arrived: boolean;

  @IsBoolean()
  is_failed_trip: boolean;

  failed_trip_details: Record<string, any>;

  @IsString()
  box_number: string;

  @IsBoolean()
  scheduled: boolean;

  @IsBoolean()
  is_hidden: boolean;

  @IsString()
  @Min(1)
  order_type_id: string;
}
