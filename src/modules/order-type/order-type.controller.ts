import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseFilters,
  Put,
} from '@nestjs/common';
import { OrderTypeService } from './order-type.service';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';

@Controller('order-type')
@UseFilters(new HttpExceptionFilter())
export class OrderTypeController {
  constructor(private readonly orderTypeService: OrderTypeService) {}

  @Post()
  async create(@Body() createOrderTypeDto: CreateOrderTypeDto) {
    return await this.orderTypeService.create(createOrderTypeDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.orderTypeService.findById(id);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    await this.orderTypeService.deleteById(id);
    return { message: 'Order type successfully deleted' };
  }

  @Get()
  async findAll() {
    return await this.orderTypeService.findAll();
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateOrderTypeDto: UpdateOrderTypeDto,
  ) {
    return await this.orderTypeService.updateById(id, updateOrderTypeDto);
  }
}
