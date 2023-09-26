import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import Meal from './meal.model';
import { Request } from 'express';
import { paginate, PaginationResult } from '../../utils/helper';

@Injectable()
export class MealService {
  async create(brandDto: CreateMealDto): Promise<Meal> {
    try {
      return await Meal.query().insert(brandDto);
    } catch (error) {
      console.log('error', error.message);
      throw new InternalServerErrorException('Failed to create the meal');
    }
  }

  async findById(id: string): Promise<Meal> {
    try {
      const meal = await Meal.query().findById(id).withGraphFetched('brand');
      if (!meal) {
        throw new NotFoundException(`Meal with ID ${id} not found`);
      }
      return meal;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch the meal by ID');
    }
  }

  async updateById(id: string, mealDto: UpdateMealDto): Promise<Meal> {
    try {
      const updatedMeal = await Meal.query().patchAndFetchById(id, {
        ...mealDto,
        updated_at: new Date(),
      });

      if (!updatedMeal) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }

      return updatedMeal;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update the brand');
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const deleted = await Meal.query().deleteById(id);
      if (!deleted) {
        throw new NotFoundException(`Meal with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete the brand');
    }
  }

  async findAll(req: Request): Promise<PaginationResult<Meal>> {
    try {
      const data = await Meal.query().withGraphFetched('brand');

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      return paginate(data, page, limit);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException('Failed to fetch Meals');
    }
  }
}
