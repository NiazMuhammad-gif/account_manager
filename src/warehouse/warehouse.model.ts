import { IsDefined, IsString } from "class-validator";


export class WarehouseRequest {

    @IsDefined()
    @IsString()
    name: string

    @IsDefined()
    @IsString()
    code: string
}