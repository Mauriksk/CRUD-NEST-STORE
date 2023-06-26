import { IsString, MinLength, IsInt, IsPositive, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsInt()
    @IsPositive()
    @Min(0)
    inInventory: number;

    @IsInt()
    @IsPositive()
    @Min(1)
    min: number;

    @IsInt()
    @IsPositive()
    @Min(1)
    max: number;
}
