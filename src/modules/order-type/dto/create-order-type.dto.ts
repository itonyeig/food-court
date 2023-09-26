import { IsString } from 'class-validator';

export class CreateOrderTypeDto {
  @IsString()
  name: string;
}
