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
import { DailyPurchaseEntryService } from './daily-purchase-entry.service'
import { DailyPurchaseRequest } from './daily_purchase_entry.model'
@Controller('dailyPurchaseEntry')
export class DailyPurchaseEntryController {
  constructor(
    private readonly dailyPurchaseEntryService: DailyPurchaseEntryService
  ) { }

  @Post()
  create(@Body() body: DailyPurchaseRequest) {
    return this.dailyPurchaseEntryService.create(body)
  }

  @Get()
  findAll() {
    return this.dailyPurchaseEntryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyPurchaseEntryService.findOne(+id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: DailyPurchaseRequest
  ) {
    return this.dailyPurchaseEntryService.update(
      +id,
      body
    )
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyPurchaseEntryService.remove(+id)
  }
}
