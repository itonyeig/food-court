import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';
import { OrderModule } from './modules/order/order.module';
import { CalculatedOrderModule } from './modules/calculated-order/calculated-order.module';
import { MealModule } from './modules/meal/meal.module';
import { AddonModule } from './modules/addon/addon.module';
import { BrandModule } from './modules/brand/brand.module';
import { OrderTypeModule } from './modules/order-type/order-type.module';

@Module({
  imports: [
    OrderModule,
    CalculatedOrderModule,
    MealModule,
    AddonModule,
    BrandModule,
    OrderTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
