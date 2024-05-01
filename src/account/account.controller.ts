import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put
} from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountRequest } from './account.model'

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post()
  create(@Body() body: AccountRequest) {
    return this.accountService.create(body)
  }

  @Get()
  findAll() {
    return this.accountService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: AccountRequest) {
    return this.accountService.update(+id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id)
  }
}
