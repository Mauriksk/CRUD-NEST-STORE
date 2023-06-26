import { IsString, MinLength, IsInt, Min } from "class-validator";
export class CreateBuyDto {
    @IsInt()
    date: number;
    @IsString()
    @MinLength(2)
    clientName: string;
    @IsString()
    @MinLength(1)
    product: string;
    @IsInt()
    @Min(1)
    quantity: number;
}

