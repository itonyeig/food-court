import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import Meal from '../meal/meal.model';
import Addon from '../addon/addon.model';
import CalculatedOrder from './calculated-order.model';
import { Request } from 'express';
import { paginate, PaginationResult } from '../../utils/helper';
import { CreateCalculatedOrderDto } from './dto/create-calculated-order.dto';
import { UpdateCalculatedOrderDto } from './dto/update-calculated-order.dto';

type ExtendedMeal = Meal & {
  addons?: Addon[];
};

@Injectable()
export class CalculatedOrderService {
  async create(orderDto: CreateCalculatedOrderDto): Promise<CalculatedOrder> {
    try {
      const uniqueMealIds = [...new Set(orderDto.meal_ids)];

      const mealDetails = await this.findByIds(uniqueMealIds);

      const totalAmount = this.calculateTotalAmount(orderDto, mealDetails);

      const orderToInsert = { ...orderDto, total_amount: totalAmount };

      const insertedOrder = await CalculatedOrder.query().insert(orderToInsert);

      await insertedOrder.$relatedQuery('meals').relate(uniqueMealIds);
      return insertedOrder;
    } catch (error) {
      console.log('error', error.message);
      throw new InternalServerErrorException('Failed to create the order');
    }
  }

  private calculateTotalAmount(
    orderDto: CreateCalculatedOrderDto,
    mealDetails: ExtendedMeal[],
  ): string {
    let total = 0;

    for (const meal of mealDetails) {
      total += Number(meal.amount);

      for (const addon of meal.addons || []) {
        total += Number(addon.amount);
      }
    }

    if (!orderDto.free_delivery) {
      total += Number(orderDto.delivery_fee);
    }

    total += Number(orderDto.service_charge);

    return total.toString();
  }

  async findByIds(ids: number[]): Promise<Meal[]> {
    try {
      const meals = await Meal.query()
        .findByIds(ids)
        .withGraphFetched('[addons, brand]');

      if (!meals || meals.length !== ids.length) {
        console.error(
          `Failed to find meals. Expected ${ids.length} but found ${meals.length}.`,
        );
        throw new NotFoundException(`Some meals not found`);
      }

      return meals;
    } catch (error) {
      console.error('Failed to fetch meals by IDs:', error); // More detailed logging
      throw new InternalServerErrorException('Failed to fetch the meals');
    }
  }

  async findAll(req: Request): Promise<PaginationResult<CalculatedOrder>> {
    try {
      const data = await CalculatedOrder.query().withGraphFetched(
        'meals.[addons,brand]',
      );

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      return paginate(data, page, limit);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException('Failed to fetch Meals');
    }
  }

  async findById(id: string): Promise<CalculatedOrder> {
    try {
      const meal = await CalculatedOrder.query()
        .findById(id)
        .withGraphFetched('meals.[addons,brand]');
      if (!meal) {
        throw new NotFoundException(`Meal with ID ${id} not found`);
      }
      return meal;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Failed to fetch the meal by ID');
    }
  }

  async updateById(
    id: string,
    orderDto: UpdateCalculatedOrderDto,
  ): Promise<CalculatedOrder> {
    try {
      const updatedOrder = await CalculatedOrder.query().patchAndFetchById(id, {
        ...orderDto,
        updated_at: new Date(),
      });

      if (!updatedOrder) {
        throw new NotFoundException(`Calculated Order with ID ${id} not found`);
      }

      return updatedOrder;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update the calculated order',
      );
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const deleted = await CalculatedOrder.query().deleteById(id);
      if (!deleted) {
        throw new NotFoundException(`Calculated Order with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete the calculated order',
      );
    }
  }
}
