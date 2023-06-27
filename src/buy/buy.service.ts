import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { Buy } from './entities/buy.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class BuyService {
  constructor(
    private readonly productService: ProductService,
    @InjectModel(Buy.name)
    private readonly buyModel: Model<Buy>,
  ) {}

  async create(createBuyDto: CreateBuyDto) {
    try {
      const existProduct: Product = await this.productService.findOne(
        createBuyDto.product,
      );

      if (existProduct.inInventory >= createBuyDto.quantity)
        throw new InternalServerErrorException(`Not enought products in the invetory`);
      if (createBuyDto.quantity <= existProduct.max && createBuyDto.quantity >= existProduct.min)
        throw new InternalServerErrorException(`Min or Max value rejected`);

        const updatedproduct: UpdateProductDto = {
          name: existProduct.name,
          min: existProduct.min,
          max: existProduct.max,
          inInventory: existProduct.inInventory - createBuyDto.quantity,
        };
        
        await this.productService.update(createBuyDto.product, updatedproduct);
        const currenDate = new Date();
        createBuyDto = {
          ...createBuyDto,
          product: createBuyDto.product.toLowerCase(),
          date: currenDate.getTime(),
        };

        const newBuy = await this.buyModel.create(createBuyDto);
        return newBuy;
      
    } catch (error) {
      throw new InternalServerErrorException(
        `somthing wrong with your buy ${JSON.stringify(error)}`,
      );
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto
    return this.buyModel.find()
      .limit(limit)
      .skip(offset)
  }
}
