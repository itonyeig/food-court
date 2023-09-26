import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import OrderType from './order-type.model';

@Injectable()
export class OrderTypeService {
  async create(orderTypeDto: CreateOrderTypeDto): Promise<OrderType> {
    try {
      return await OrderType.query().insert(orderTypeDto);
    } catch (error) {
      if (error.message.includes('duplicate')) {
        throw new ConflictException(
          'OrderType with the given details already exists',
        );
      }
      throw new InternalServerErrorException('Failed to create the order type');
    }
  }

  async findById(id: string): Promise<OrderType> {
    try {
      const orderType = await OrderType.query().findById(id);
      if (!orderType) {
        throw new NotFoundException(`OrderType with ID ${id} not found`);
      }
      return orderType;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch the order type by ID',
      );
    }
  }

  async updateById(
    id: string,
    orderTypeDto: UpdateOrderTypeDto,
  ): Promise<OrderType> {
    try {
      const updatedOrderType = await OrderType.query().patchAndFetchById(id, {
        ...orderTypeDto,
        updated_at: new Date(),
      });

      if (!updatedOrderType) {
        throw new NotFoundException(`OrderType with ID ${id} not found`);
      }

      return updatedOrderType;
    } catch (error) {
      if (error.message && error.message.includes('duplicate')) {
        throw new ConflictException(
          'Another order type has the same details you tried to update to.',
        );
      }

      throw new InternalServerErrorException('Failed to update the order type');
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const deleted = await OrderType.query().deleteById(id);
      if (!deleted) {
        throw new NotFoundException(`OrderType with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete the order type');
    }
  }

  async findAll(): Promise<OrderType[]> {
    try {
      return await OrderType.query();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch order types');
    }
  }
}
