import { Module } from '@nestjs/common';
import { OrderTypeService } from './order-type.service';
import { OrderTypeController } from './order-type.controller';
import OrderType from './order-type.model';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  controllers: [OrderTypeController],
  providers: [
    OrderTypeService,
    OrderType,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class OrderTypeModule {}
