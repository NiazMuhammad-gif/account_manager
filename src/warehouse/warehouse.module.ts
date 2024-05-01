import { Module } from '@nestjs/common'
import { WarehouseService } from './warehouse.service'
import { WarehouseController } from './warehouse.controller'
import { StorageModule } from 'src/storage/storage.module'

@Module({
  imports: [StorageModule],
  controllers: [WarehouseController],
  providers: [WarehouseService]
})
export class WarehouseModule { }
