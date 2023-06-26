import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { BuyModule } from './buy/buy.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/store-challenge'),
    ProductModule,
    BuyModule,
  ],
})
export class AppModule {}