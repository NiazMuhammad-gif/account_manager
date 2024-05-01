import { Type } from "class-transformer";
import { IsDefined, IsOptional, IsPositive, IsString } from "class-validator";


export class ItemRequest {
    @IsDefined()
    @IsString()
    name: String

    @IsDefined()
    @IsString()
    unit: String

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    salePrice: Number
}