// warehouse.entity.ts
import { Entity, Column, Unique, PrimaryColumn, OneToMany } from 'typeorm'
import { DailySalesEntry } from './daily-sales-entry.entity'
import { DailyPurchaseEntry } from './daily-purchase-entry.entity'

@Entity()
@Unique(['code'])
export class Warehouse {
  @Column({ name: 'warehouseid', type: 'smallint' })
  @PrimaryColumn({ primaryKeyConstraintName: 'pk_warehouseid' })
  warehouseid: number

  @Column({ name: 'name', type: 'varchar', length: 48 })
  name: string

  @Column({ name: 'code', type: 'varchar', length: 5 })
  code: string

  @OneToMany(() => DailySalesEntry, (a) => a.dailySalesWarehouse)
  warehouses: DailySalesEntry[]
  @OneToMany(() => DailyPurchaseEntry, (a) => a.dailyPurchaseWarehouse)
  PurchaseWarehouses: DailyPurchaseEntry[]
}
