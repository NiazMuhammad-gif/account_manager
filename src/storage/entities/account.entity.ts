// account.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { AccountType } from './account-type.entity'
import { City } from './city.entity'
import { DailySalesEntry } from './daily-sales-entry.entity'
import { DailyPurchaseEntry } from './daily-purchase-entry.entity'
import { Voucher } from './voucher.entity'

@Entity()
export class Account {
  @Column({ name: 'accountid', type: 'int' })
  @PrimaryColumn({ primaryKeyConstraintName: 'pk_accountid' })
  accountid: number

  @Column({ name: 'title', type: 'varchar', length: 128 })
  title: string

  @Column({ name: 'amount', type: 'numeric', precision: 12, scale: 2 })
  amount: number

  @Column({ name: 'detail', type: 'varchar', length: 128, nullable: true })
  detail: string

  @Column({ name: 'address', type: 'varchar', length: 512, nullable: true })
  address: string

  @Column({ name: 'cityid', type: 'smallint', nullable: false })
  cityid: number

  @Column({ name: 'accounttypeid', type: 'smallint', nullable: false })
  accounttypeid: number

  @Column({
    name: 'telephone',
    type: 'varchar',
    length: 12,
    nullable: true
  })
  telephone: string

  @Column({
    name: 'phone', type: 'varchar',
    length: 11,
    nullable: false
  })
  phone: string

  @Column({
    name: 'fax',
    type: 'varchar',
    length: 12,
    nullable: true
  })
  fax: string

  @Column({ name: 'email', type: 'varchar', length: 48, nullable: true })
  email: string

  @ManyToOne(() => AccountType, (a) => a.accountTypes)
  @JoinColumn({
    name: 'accounttypeid',
    referencedColumnName: 'accounttypeid',
    foreignKeyConstraintName: 'fk_account_type'
  })
  accountType: AccountType

  @ManyToOne(() => City, (a) => a.cities)
  @JoinColumn({
    name: 'cityid',
    referencedColumnName: 'cityid',
    foreignKeyConstraintName: 'fk_account_city'
  })
  accountCity: City

  @OneToMany(() => DailySalesEntry, (a) => a.dailySalesAccount)
  dailySalesAccounts: DailySalesEntry[]

  @OneToMany(() => DailySalesEntry, (a) => a.dailySalesSupplier)
  suppliers: DailySalesEntry[]

  @OneToMany(() => DailyPurchaseEntry, (a) => a.dailyPurchaseAccount)
  dailyPurchaseAccounts: DailyPurchaseEntry[]

  @OneToMany(() => DailyPurchaseEntry, (a) => a.dailyPurchaseSupplier)
  purchaseSuppliers: DailyPurchaseEntry[]

  @OneToMany(() => Voucher, (a) => a.accountVoucher)
  vouchers: Voucher[]
}
