import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import Order from './order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { paginate, PaginationResult } from '../../utils/helper';
import { Request } from 'express';

@Injectable()
export class OrderService {
  async create(orderDto: CreateOrderDto): Promise<Order> {
    try {
      const insertedOrder = await Order.query().insert(orderDto);
      return insertedOrder;
    } catch (error) {
      console.log('error', error.message);
      throw new InternalServerErrorException('Failed to create the order');
    }
  }

  async findAll(req: Request): Promise<PaginationResult<Order>> {
    try {
      const data = await Order.query();

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      return paginate(data, page, limit);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException('Failed to fetch Orders');
    }
  }

  async findById(id: string): Promise<Order> {
    try {
      const order = await Order.query().findById(id);
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Failed to fetch the order by ID');
    }
  }

  async updateById(id: string, orderDto: UpdateOrderDto): Promise<Order> {
    try {
      const updatedOrder = await Order.query().patchAndFetchById(id, {
        ...orderDto,
        updated_at: new Date(),
      });

      if (!updatedOrder) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      return updatedOrder;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update the order');
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const deleted = await Order.query().deleteById(id);
      if (!deleted) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete the order');
    }
  }

  async processOrder(order: Order, description: string): Promise<Order> {
    // 1. Validates the order status
    if (order.completed || order.cancelled || order.kitchen_cancelled) {
      throw new Error('Order cannot be processed due to its current status.');
    }

    // 2. Checks kitchen processes
    if (
      !order.kitchen_accepted ||
      !order.kitchen_prepared ||
      !order.kitchen_dispatched
    ) {
      throw new Error('Order kitchen processes are incomplete');
    }

    // 3. Calculates the total order amount, including addons
    // this is already done in calculate order module

    // 4. Updates and logs the order status
    order.logs.push({
      time: new Date().toISOString(),
      description,
    });

    return await this.updateOrderInDB(order);
  }

  calculateTotalAmount(order: Order): number {
    // Implement logic to calculate total order amount (this is unclear)
    // As an example, I'll just return a fixed value
    return 100; // replace this with your actual calculation
  }

  // Placeholder
  async updateOrderInDB(order: Order): Promise<Order> {
    return order;
  }
}
