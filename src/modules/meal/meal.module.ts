import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import Meal from './meal.model';

@Module({
  controllers: [MealController],
  providers: [
    MealService,
    Meal,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class MealModule {}
