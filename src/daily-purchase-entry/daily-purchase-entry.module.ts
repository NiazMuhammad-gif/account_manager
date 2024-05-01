import { Module } from '@nestjs/common'
import { DailyPurchaseEntryService } from './daily-purchase-entry.service'
import { DailyPurchaseEntryController } from './daily-purchase-entry.controller'
import { StorageModule } from 'src/storage/storage.module'

@Module({
  imports: [StorageModule],
  controllers: [DailyPurchaseEntryController],
  providers: [DailyPurchaseEntryService]
})
export class DailyPurchaseEntryModule { }
