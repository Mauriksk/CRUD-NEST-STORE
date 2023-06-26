import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      createProductDto.name = createProductDto.name.toLocaleLowerCase();
      const product = await this.productModel.create(createProductDto);
      return product;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: string) {
    let product: Product;

    if (isValidObjectId(id)) {
      product = await this.productModel.findById(id);
    }

    if (!product) {
      product = await this.productModel.findOne({
        name: id.toLocaleLowerCase().trim(),
      });
    }

    if (!product)
      throw new NotFoundException(`Product with id or name ${id} not found`);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (updateProductDto.name) {
      updateProductDto.name = updateProductDto.name.toLocaleLowerCase();
    }
    try {
      await product.updateOne(updateProductDto);
      return { ...product.toJSON(), ...updateProductDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await product.deleteOne()
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Product already exist ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException("Can't add new product");
  }
}
