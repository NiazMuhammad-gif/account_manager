import { Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ServiceModes } from '../app/constants'
import { StorageService } from './storage.service'
import { AccountType } from './entities/account-type.entity'
import { Account } from './entities/account.entity'
import { City } from './entities/city.entity'
import { DailySalesEntry } from './entities/daily-sales-entry.entity'
import { DailyPurchaseEntry } from './entities/daily-purchase-entry.entity'
import { Item } from './entities/item.entity'
import { Voucher } from './entities/voucher.entity'
import { Warehouse } from './entities/warehouse.entity'

export const Schema = process.env['DB_SCHEMA'] ?? 'accounts'
function getOptions(): TypeOrmModuleOptions {
  const mode = (
    process.env['SERVICE_MODE'] ?? ServiceModes.Production
  ).toLowerCase()

  const options: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env['DB_HOST'],
    port: +process.env['DB_PORT']!,
    database: process.env['DB_DATABASE'],
    username: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    schema: process.env['DB_SCHEMA'],
    autoLoadEntities: true,
    entities: [
      AccountType,
      Account,
      City,
      DailySalesEntry,
      DailyPurchaseEntry,
      Item,
      Voucher,
      Warehouse
    ],
    retryAttempts: 1,
    useUTC: true,
    synchronize: false,
    logging:
      mode === 'prod' || mode === 'dev'
        ? ['error', 'warn', 'info', 'schema', 'log']
        : ['query', 'error', 'warn', 'info', 'schema', 'log'],
    applicationName: 'trip service'
  }

  return options
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(getOptions())
  ],
  providers: [StorageService],
  exports: [StorageService]
})
export class StorageModule implements NestModule {
  // eslint-disable-next-line prettier/prettier
  configure() { }
}
