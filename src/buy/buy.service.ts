import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { Buy } from './entities/buy.entity';

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
      if (
        existProduct.inInventory >= createBuyDto.quantity &&
        createBuyDto.quantity <= existProduct.max &&
        createBuyDto.quantity >= existProduct.min
      ) {
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
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `somthing wrong with your buy ${JSON.stringify(error)}`,
      );
    }
    // try {1
    //   if(createBuyDto.products.length){
    //     createBuyDto.products.forEach(async ({name, quantity }) => {
    //      const existProduct = await this.productService.findOne(name)
    //      if(existProduct && existProduct.inInventory >= quantity){
    //        const newBuy: UpdateProductDto = {
    //          ...existProduct,
    //          inInventory: (existProduct.inInventory - quantity)
    //        }
    //        this.productService.update(name, newBuy)
    //      }
    //      throw new NotFoundException(`Product not exist or insufficient amount of ${name}`);
    //    })
    //  }
    // const currentDate = new Date()
    // const buyDto: CreateBuyDto = {
    //   ...createBuyDto,
    //   date: currentDate.getDate().toLocaleString(),
    // }
    // this.buyModel.create(buyDto)
    //  return buyDto;
    // } catch (error) {
    //   throw new BadRequestException(
    //     `Product already exist ${JSON.stringify(error.keyValue)}`,
    //   );
    // }
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
