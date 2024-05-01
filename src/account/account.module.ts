import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { StorageModule } from 'src/storage/storage.module'

@Module({
  imports: [StorageModule],
  controllers: [AccountController],
  providers: [AccountService]
})
// eslint-disable-next-line prettier/prettier
export class AccountModule { }
