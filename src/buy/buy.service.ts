import { Injectable } from '@nestjs/common';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';

@Injectable()
export class BuyService {

  constructor(
    
  ){}

  create(createBuyDto: CreateBuyDto) {
    return 'This action adds a new buy';
  }

  findAll() {
    return `This action returns all buy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buy`;
  }

  update(id: number, updateBuyDto: UpdateBuyDto) {
    return `This action updates a #${id} buy`;
  }

  remove(id: number) {
    return `This action removes a #${id} buy`;
  }
}
