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
import { CalculatedOrderService } from './calculated-order.service';
import { CreateCalculatedOrderDto } from './dto/create-calculated-order.dto';
import { UpdateCalculatedOrderDto } from './dto/update-calculated-order.dto';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { Request } from 'express';

@Controller('calculated-order')
@UseFilters(new HttpExceptionFilter())
export class CalculatedOrderController {
  constructor(
    private readonly calculatedOrderService: CalculatedOrderService,
  ) {}

  @Post()
  async create(@Body() createMealDto: CreateCalculatedOrderDto) {
    return await this.calculatedOrderService.create(createMealDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return await this.calculatedOrderService.findAll(req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.calculatedOrderService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCalculatedOrderDto: UpdateCalculatedOrderDto,
  ) {
    return await this.calculatedOrderService.updateById(
      id,
      updateCalculatedOrderDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.calculatedOrderService.deleteById(id);
    return { message: 'deleted' };
  }
}
