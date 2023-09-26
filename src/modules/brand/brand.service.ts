import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import Brand from './brand.model';

@Injectable()
export class BrandService {
  async create(brandDto: CreateBrandDto): Promise<Brand> {
    try {
      return await Brand.query().insert(brandDto);
    } catch (error) {
      console.log('error', error);
      if (error.message.includes('duplicate')) {
        throw new ConflictException(
          'Brand with the given details already exists',
        );
      }
      throw new InternalServerErrorException('Failed to create the brand');
    }
  }

  async findById(id: string): Promise<Brand> {
    try {
      const brand = await Brand.query().findById(id);
      if (!brand) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }
      return brand;
    } catch (error) {
      // For other unexpected errors
      throw new InternalServerErrorException('Failed to fetch the brand by ID');
    }
  }

  async updateById(id: string, brandDto: UpdateBrandDto): Promise<Brand> {
    try {
      const updatedBrand = await Brand.query().patchAndFetchById(id, {
        ...brandDto,
        updated_at: new Date(),
      });

      if (!updatedBrand) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }

      return updatedBrand;
    } catch (error) {
      if (error.message && error.message.includes('duplicate')) {
        throw new ConflictException(
          'Another brand has the same details you tried to update to.',
        );
      }

      throw new InternalServerErrorException('Failed to update the brand');
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const deleted = await Brand.query().deleteById(id);
      if (!deleted) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }
    } catch (error) {
      // For other unexpected errors
      throw new InternalServerErrorException('Failed to delete the brand');
    }
  }

  async findAll(): Promise<Brand[]> {
    try {
      return await Brand.query();
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException('Failed to fetch brands');
    }
  }
}
