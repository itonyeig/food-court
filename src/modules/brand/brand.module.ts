import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import Brand from './brand.model';

@Module({
  controllers: [BrandController],
  providers: [
    BrandService,
    Brand,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class BrandModule {}
