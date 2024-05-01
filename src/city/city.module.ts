import { Module } from '@nestjs/common'
import { CityService } from './city.service'
import { CityController } from './city.controller'
import { StorageModule } from 'src/storage/storage.module'

@Module({
  imports: [StorageModule],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule { }
