import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsInt,
  IsDate,
  Min,
} from 'class-validator';

export class AddressDetailsDto {
  @IsString()
  city: string;

  @IsString()
  name: string;

  @IsString()
  address_line: string;

  @IsString()
  building_number: string;

  @IsDate()
  time: Date;
}

export class CreateCalculatedOrderDto {
  @IsBoolean()
  free_delivery: boolean;

  @IsString()
  delivery_fee: string;

  @IsString()
  service_charge: string;

  @ValidateNested()
  @Type(() => AddressDetailsDto)
  address_details: AddressDetailsDto;

  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  meal_ids: number[];

  @IsString()
  lat: string;

  @IsString()
  lng: string;

  @IsString()
  cokitchen_polygon_id: string;

  @IsString()
  user_id: string;

  @IsString()
  cokitchen_id: string;

  @IsBoolean()
  pickup: boolean;

  @IsString()
  prev_price: string;
}
