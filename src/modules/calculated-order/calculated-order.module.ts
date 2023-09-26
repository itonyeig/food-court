import { Module } from '@nestjs/common';
import { CalculatedOrderService } from './calculated-order.service';
import { CalculatedOrderController } from './calculated-order.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import CalculatedOrder from './calculated-order.model';

@Module({
  controllers: [CalculatedOrderController],
  providers: [
    CalculatedOrderService,
    CalculatedOrder,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class CalculatedOrderModule {}
