import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsInt, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";


export class AccountRequest {
    @IsDefined()
    @IsString()
    title: string

    @IsDefined()
    @Type(() => Number)
    @IsNumber()
    amount: number

    @IsOptional()
    @IsString()
    detail: string

    @IsOptional()
    @IsString()
    address: string

    @IsDefined()
    @Type(() => Number)
    @IsPositive()
    @IsInt()
    cityId: number

    @IsDefined()
    @Type(() => Number)
    @IsPositive()
    @IsInt()
    accountTypeId: number

    @IsDefined()
    @IsString()
    @MaxLength(11)
    @MinLength(11)
    phone: string

    @IsOptional()
    @IsString()
    @MaxLength(11)
    @MinLength(11)
    telephone: string

    @IsOptional()
    @IsString()
    @MaxLength(11)
    @MinLength(11)
    fax: string

    @IsOptional()
    @IsEmail()
    email: string
}