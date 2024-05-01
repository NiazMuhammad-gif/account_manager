import { Module } from '@nestjs/common'
import { DailySalesEntryService } from './daily-sales-entry.service'
import { DailySalesEntryController } from './daily-sales-entry.controller'
import { StorageModule } from 'src/storage/storage.module'

@Module({
  imports: [StorageModule],
  controllers: [DailySalesEntryController],
  providers: [DailySalesEntryService]
})
export class DailySalesEntryModule { }
