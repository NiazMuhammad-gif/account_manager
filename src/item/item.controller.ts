import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { ItemService } from './item.service'
import { ItemRequest } from './item.model'

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Post()
  create(@Body() body: ItemRequest) {
    return this.itemService.create(body)
  }

  @Get()
  findAll() {
    return this.itemService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: ItemRequest) {
    return this.itemService.update(+id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id)
  }
}
