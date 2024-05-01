import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import { LogRequestMiddleware } from './log-request.middleware'
import { StorageModule } from 'src/storage/storage.module'
import { AccountTypeModule } from 'src/account-type/account-type.module'
import { AccountModule } from 'src/account/account.module'
import { CityModule } from 'src/city/city.module'
import { DailySalesEntryModule } from 'src/daily-sales-entry/daily-sales-entry.module'
import { DailyPurchaseEntryModule } from 'src/daily-purchase-entry/daily-purchase-entry.module'
import { ItemModule } from 'src/item/item.module'
import { WarehouseModule } from 'src/warehouse/warehouse.module'
import { VoucherModule } from 'src/voucher/voucher.module'
// import { ErrorFilter } from './error-filter.filter'
// import { APP_FILTER } from '@nestjs/core'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format((x) => ({ ...x, level: x.level.toUpperCase() }))(),
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.File({ filename: './logs/service.log' }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
            winston.format.printf(
              (x) => `[${x['timestamp']}]  ${x.level} ${x.message}`
            )
          )
        })
      ]
    }),
    StorageModule,
    AccountTypeModule,
    AccountModule,
    CityModule,
    DailySalesEntryModule,
    DailyPurchaseEntryModule,
    ItemModule,
    VoucherModule,
    WarehouseModule
  ],
  providers: [LogRequestMiddleware],
  exports: [LogRequestMiddleware]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogRequestMiddleware).forRoutes('*')
  }
}
