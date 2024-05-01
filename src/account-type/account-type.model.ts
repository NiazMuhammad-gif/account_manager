import { IsDefined, IsString } from "class-validator";


export class AccountTypeRequest {
    @IsDefined()
    @IsString()
    accountType: string

    @IsDefined()
    @IsString()
    accountTitle: string

}