import { PartialType } from '@nestjs/mapped-types';
import { CreateBuyDto } from './create-buy.dto';

export class UpdateBuyDto extends PartialType(CreateBuyDto) {}
