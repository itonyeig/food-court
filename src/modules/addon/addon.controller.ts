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
import { AddonService } from './addon.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { Request } from 'express';

@Controller('addon')
@UseFilters(new HttpExceptionFilter())
export class AddonController {
  constructor(private readonly addonService: AddonService) {}

  @Post()
  async create(@Body() createAddonDto: CreateAddonDto) {
    return await this.addonService.create(createAddonDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return await this.addonService.findAll(req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.addonService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddonDto: UpdateAddonDto,
  ) {
    return await this.addonService.updateById(id, updateAddonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.addonService.deleteById(id);

    return { message: 'addon deleted' };
  }
}
