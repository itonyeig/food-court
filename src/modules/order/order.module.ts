import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import Order from './order.model';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    Order,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class OrderModule {}
