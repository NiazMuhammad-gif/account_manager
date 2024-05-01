import { IsDefined, IsString } from "class-validator";


export class CityRequest {
    @IsDefined()
    @IsString()
    name: string
}