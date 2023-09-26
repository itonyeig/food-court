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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { Request } from 'express';

@Controller('order')
@UseFilters(new HttpExceptionFilter())
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return await this.orderService.findAll(req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.updateById(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.orderService.deleteById(id);
    return { message: 'order deleted' };
  }
}
