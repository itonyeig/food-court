import { Type } from 'class-transformer';
import { IsString, IsBoolean, ValidateNested, IsArray } from 'class-validator';

export class AddressDetailsDto {
  @IsString()
  city: string;

  @IsString()
  name: string;

  @IsString()
  address_line: string;

  @IsString()
  building_number: string;
}

export class CreateCalculatedOrderDto {
  @IsString()
  total_amount: string;

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
  @IsString({ each: true })
  meal_ids: string[];
}
