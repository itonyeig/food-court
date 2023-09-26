import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Req,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { Request } from 'express';

@Controller('meal')
@UseFilters(new HttpExceptionFilter())
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  async create(@Body() createMealDto: CreateMealDto) {
    return await this.mealService.create(createMealDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return await this.mealService.findAll(req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.mealService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return await this.mealService.updateById(id, updateMealDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.mealService.deleteById(id);
  }
}
