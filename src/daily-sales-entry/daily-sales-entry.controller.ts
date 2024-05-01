import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { DailySalesEntryService } from './daily-sales-entry.service'
import { DailySalesRequest } from './daily_sales_entry.model'

@Controller('dailySalesEntry')
export class DailySalesEntryController {
  constructor(
    private readonly dailySalesEntryService: DailySalesEntryService
  ) { }

  @Post()
  create(@Body() body: DailySalesRequest) {
    return this.dailySalesEntryService.create(body)
  }

  @Get()
  findAll() {
    return this.dailySalesEntryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailySalesEntryService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: DailySalesRequest
  ) {
    return this.dailySalesEntryService.update(+id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailySalesEntryService.remove(+id)
  }
}
