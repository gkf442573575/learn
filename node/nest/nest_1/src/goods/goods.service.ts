import { GoodsDto } from '../dots/goods.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoodsService {
  goodslist: GoodsDto[] = [
    {
      goodsid: '1',
      goodsname: '商品1',
      goodsprice: 12.12,
      goodsimg:
        'https://gma.alicdn.com/bao/uploaded/i4/47577209/TB2vty_dnAKL1JjSZFCXXXFspXa_!!0-saturn_solar.jpg_200x200.jpg_.webp',
    },
    {
      goodsid: '2',
      goodsname: '商品2',
      goodsprice: 10.0,
      goodsimg:
        'https://gma.alicdn.com/bao/uploaded/i4/670504546/O1CN01QdoIf91jS73kJ6kPW_!!670504546.jpg_200x200.jpg_.webp',
    },
  ];

  async getGoods() {
    return this.goodslist;
  }
}
