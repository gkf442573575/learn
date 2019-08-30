import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Req,
  HttpCode,
  Header,
  Param,
  Body,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto, UpdateCatDto } from '../dots/cats.dto';
import { Cat } from '../interfaces/cat.interface';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto){
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
    return `这是${id}的猫`;
  }

  @Get()
  async findAll(@Req() request : Request): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<string> {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return `This action removes a #${id} cat`;
  }
}
