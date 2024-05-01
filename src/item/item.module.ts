import { Module } from '@nestjs/common'
import { ItemService } from './item.service'
import { ItemController } from './item.controller'
import { StorageModule } from 'src/storage/storage.module'

@Module({
  imports: [StorageModule],
  controllers: [ItemController],
  providers: [ItemService]
})
export class ItemModule { }
