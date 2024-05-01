import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put
} from '@nestjs/common'
import { AccountTypeService } from './account-type.service'
import { AccountTypeRequest } from './account-type.model'

@Controller('accountType')
export class AccountTypeController {
  constructor(private readonly accountTypeService: AccountTypeService) { }

  @Post()
  create(@Body() body: AccountTypeRequest) {
    return this.accountTypeService.create(body)
  }

  @Get()
  findAll() {
    return this.accountTypeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountTypeService.findOne(+id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: AccountTypeRequest
  ) {
    return this.accountTypeService.update(+id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountTypeService.remove(+id)
  }
}
