import { Module } from '@nestjs/common'
import { AccountTypeService } from './account-type.service'
import { AccountTypeController } from './account-type.controller'
import { StorageModule } from 'src/storage/storage.module'

@Module({
  imports: [StorageModule],
  controllers: [AccountTypeController],
  providers: [AccountTypeService]
})
// eslint-disable-next-line prettier/prettier
export class AccountTypeModule { }
