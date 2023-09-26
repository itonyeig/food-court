import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseFilters,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';

@Controller('brand')
@UseFilters(new HttpExceptionFilter())
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.create(createBrandDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.brandService.findById(id);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return await this.brandService.updateById(id, updateBrandDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    await this.brandService.deleteById(id);
    return { message: 'brand sucessfully deleted' };
  }

  @Get()
  async findAll() {
    return await await this.brandService.findAll();
  }
}
