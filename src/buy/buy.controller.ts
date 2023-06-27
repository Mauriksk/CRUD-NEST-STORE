import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BuyService } from './buy.service';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('buy')
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  @Post()
  create(@Body() createBuyDto: CreateBuyDto) {
    return this.buyService.create(createBuyDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.buyService.findAll(paginationDto);
  }

}
