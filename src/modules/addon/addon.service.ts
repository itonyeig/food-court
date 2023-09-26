import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import Addon from './addon.model';
import { Request } from 'express';
import { paginate, PaginationResult } from '../../utils/helper';

@Injectable()
export class AddonService {
  async create(addonDto: CreateAddonDto): Promise<Addon> {
    try {
      return await Addon.query().insert(addonDto);
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Failed to create the addon');
    }
  }

  async findById(id: string): Promise<Addon> {
    try {
      const addon = await Addon.query().findById(id).withGraphFetched('meal');
      if (!addon) {
        throw new NotFoundException(`Addon with ID ${id} not found`);
      }
      return addon;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch the addon by ID');
    }
  }

  async updateById(id: string, addonDto: UpdateAddonDto): Promise<Addon> {
    try {
      const updatedAddon = await Addon.query().patchAndFetchById(id, {
        ...addonDto,
        updated_at: new Date(),
      });

      if (!updatedAddon) {
        throw new NotFoundException(`Addon with ID ${id} not found`);
      }

      return updatedAddon;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update the addon');
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const deleted = await Addon.query().deleteById(id);
      if (!deleted) {
        throw new NotFoundException(`Addon with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete the addon');
    }
  }

  async findAll(req: Request): Promise<PaginationResult<Addon>> {
    try {
      const data = await Addon.query().withGraphFetched('meal');

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 50;

      return paginate(data, page, limit);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch Addons');
    }
  }
}
