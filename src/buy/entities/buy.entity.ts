import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Buy extends Document {
    @Prop({
        unique: false,
        index: true,
    })
    date: number;
    
    @Prop({
        unique: false,
        index: true,
    })
    clientName: string;

    @Prop({
        unique: false,
        index: true,
    })
    product: string;
    @Prop({
        unique: false,
        index: true,
    })
    quantity: number;
}

export const BuySchema = SchemaFactory.createForClass(Buy);