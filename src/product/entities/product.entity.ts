import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
    @Prop({
        unique: true,
        index: true,
    })
    name: string;
    @Prop({
        unique: false,
        index: true,
    })
    inInventory: number;
    @Prop({
        unique: false,
        index: true,
    })
    min: number;
    @Prop({
        unique: false,
        index: true,
    })
    max: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)
