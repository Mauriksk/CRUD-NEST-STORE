import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Buy, BuySchema } from './entities/buy.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  controllers: [BuyController],
  providers: [BuyService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Buy.name,
        schema: BuySchema
      }
    ]),
    ProductModule
  ]
})
export class BuyModule {}
