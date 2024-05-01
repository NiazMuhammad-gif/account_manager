import { Type } from "class-transformer";
import { IsDefined, IsPositive, IsString } from "class-validator";


export class DailyPurchaseRequest {
    @IsDefined()
    @Type(() => Number)
    @IsPositive()
    accountId: number

    @IsDefined()
    @Type(() => Number)
    @IsPositive()
    itemId: number

    @IsDefined()
    @Type(() => Number)
    @IsPositive()
    warehouseId: number

    @IsDefined()
    @Type(() => Number)
    @IsPositive()
    supplierId: number

    @IsDefined()
    @Type(() => Number)
    @IsPositive()
    bale: number

    @IsDefined()
    @Type(() => Number)
    @IsPositive()
    quantity: number

    @IsDefined()
    @IsString()
    baleType: number

    @IsDefined()
    @Type(() => Number)
    @IsPositive()
    rate: number

    @IsDefined()
    @Type(() => Number)
    @IsPositive()
    amount: number
}