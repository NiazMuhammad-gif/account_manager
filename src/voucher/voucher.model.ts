import { Type } from "class-transformer";
import { IsDefined, IsInt, IsPositive, IsString } from "class-validator";


export class VoucherRequest {

    @IsDefined()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    accountId: number

    @IsDefined()
    @Type(() => Number)
    @IsPositive()
    amount: number

    @IsDefined()
    @IsString()
    naration: string
}