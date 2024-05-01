// daily-purchase-entry.entity.ts
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm'
import { Account } from './account.entity'
import { Item } from './item.entity'
import { Warehouse } from './warehouse.entity'

@Entity()
export class DailyPurchaseEntry {
  @Column({ name: 'purchasedocumentid', type: 'bigint' })
  @PrimaryColumn({ primaryKeyConstraintName: 'pk_purchasedocumentid' })
  purchasedocumentid: number

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

  @ManyToOne(() => Account, (a) => a.dailyPurchaseAccounts)
  @JoinColumn({
    name: 'accountid',
    referencedColumnName: 'accountid',
    foreignKeyConstraintName: 'fk_account_daily_purchase_entry'
  })
  dailyPurchaseAccount: Account

  @ManyToOne(() => Item, (a) => a.dailyPurchaseItems)
  @JoinColumn({
    name: 'itemid',
    referencedColumnName: 'itemid',
    foreignKeyConstraintName: 'fk_item_daily_purchase_entry'
  })
  dailyPurchaseItem: Item

  @ManyToOne(() => Warehouse, (a) => a.PurchaseWarehouses)
  @JoinColumn({
    name: 'warehouseid',
    referencedColumnName: 'warehouseid',
    foreignKeyConstraintName: 'fk_location_daily_purchase_entry'
  })
  dailyPurchaseWarehouse: Warehouse

  @ManyToOne(() => Account, (a) => a.purchaseSuppliers)
  @JoinColumn({
    name: 'supplierid',
    referencedColumnName: 'accountid',
    foreignKeyConstraintName: 'fk_supplier_account_daily_purchase_entry'
  })
  dailyPurchaseSupplier: Account
}
