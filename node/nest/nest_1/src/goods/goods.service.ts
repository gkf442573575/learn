import { GoodsDto } from '../dots/goods.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoodsService {

  goodslist: GoodsDto[] = [];

  
}
