import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { WarehouseService } from './warehouse.service'
import { WarehouseRequest } from './warehouse.model'
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) { }

  @Post()
  create(@Body() body: WarehouseRequest) {
    return this.warehouseService.create(body)
  }

  @Get()
  findAll() {
    return this.warehouseService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: WarehouseRequest
  ) {
    return this.warehouseService.update(+id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(+id)
  }
}
