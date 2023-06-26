import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Buy extends Document {
    @Prop({
        unique: false,
        index: true,
    })
    date: string;
    
    @Prop({
        unique: false,
        index: true,
    })
    clientName: string;
    
    @Prop({
        unique: false,
        index: true,
    })
    products: []
}

interface Product {
    name: string;
    quantity: number;
}

export const BuySchema = SchemaFactory.createForClass(Buy);