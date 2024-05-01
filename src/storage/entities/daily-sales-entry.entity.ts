// daily-sales-entry.entity.ts
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm'
import { Account } from './account.entity'
import { Item } from './item.entity'
import { Warehouse } from './warehouse.entity'

@Entity()
export class DailySalesEntry {
  @Column({ name: 'salesdocumentid', type: 'bigint' })
  @PrimaryColumn({ primaryKeyConstraintName: 'pk_salesdocumentid' })
  salesdocumentid: number

  @Column({
    name: 'date',
    type: 'time with time zone',
    nullable: false
  })
  date: Date

  @Column({ name: 'accountid', type: 'int', nullable: false })
  accountid: number

  @Column({ name: 'itemid', type: 'int', nullable: false })
  itemid: number

  @Column({ name: 'warehouseid', type: 'int', nullable: false })
  warehouseid: number

  @Column({ name: 'supplierid', type: 'int', nullable: false })
  supplierid: number

  @Column({ name: 'bale', type: 'int', nullable: false })
  bale: number

  @Column({ name: 'quantity', type: 'int', nullable: false })
  quantity: number

  @Column({ name: 'baletype', type: 'char', length: 1, nullable: false })
  baleType: string

  @Column({ name: 'rate', type: 'numeric', precision: 12, scale: 5 })
  rate: number

  @Column({ name: 'amount', type: 'numeric', precision: 17, scale: 5 })
  amount: number

  @ManyToOne(() => Account, (a) => a.dailySalesAccounts)
  @JoinColumn({
    name: 'accountid',
    referencedColumnName: 'accountid',
    foreignKeyConstraintName: 'fk_account_daily_sales_entry'
  })
  dailySalesAccount: Account

  @ManyToOne(() => Item, (a) => a.dailySalesItems)
  @JoinColumn({
    name: 'itemid',
    referencedColumnName: 'itemid',
    foreignKeyConstraintName: 'fk_item_daily_sales_entry'
  })
  dailySalesItem: Item

  @ManyToOne(() => Warehouse, (a) => a.warehouses)
  @JoinColumn({
    name: 'warehouseid',
    referencedColumnName: 'warehouseid',
    foreignKeyConstraintName: 'fk_location_daily_sales_entry'
  })
  dailySalesWarehouse: Warehouse

  @ManyToOne(() => Account, (a) => a.suppliers)
  @JoinColumn({
    name: 'supplierid',
    referencedColumnName: 'accountid',
    foreignKeyConstraintName: 'fk_supplier_account_daily_sales_entry'
  })
  dailySalesSupplier: Account
}
