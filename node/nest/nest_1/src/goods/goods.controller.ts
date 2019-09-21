import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}
  @Get('/')
  async getGoods() {
    let goodslist = await this.goodsService.getGoods();
    console.log('goodslist', goodslist);
    
    return { code: 200, success: true, goodslist };
  }
}
