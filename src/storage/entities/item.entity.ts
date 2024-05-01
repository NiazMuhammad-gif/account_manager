// item.entity.ts
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { DailySalesEntry } from './daily-sales-entry.entity'
import { DailyPurchaseEntry } from './daily-purchase-entry.entity'

@Entity()
export class Item {
  @Column({ name: 'itemid', type: 'int' })
  @PrimaryColumn({ primaryKeyConstraintName: 'pk_itemid' })
  itemid: number

  @Column({ name: 'name', type: 'varchar', length: 48 })
  name: string

  @Column({ name: 'unit', type: 'varchar', length: 5 })
  unit: string

  @Column({
    name: 'saleprice',
    type: 'numeric',
    precision: 8,
    scale: 2,
    nullable: true
  })
  salePrice: number

  @OneToMany(() => DailySalesEntry, (a) => a.dailySalesItem)
  dailySalesItems: DailySalesEntry[]

  @OneToMany(() => DailyPurchaseEntry, (a) => a.dailyPurchaseItem)
  dailyPurchaseItems: DailyPurchaseEntry[]
}
