// voucher.entity.ts
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm'
import { Account } from './account.entity'

@Entity()
export class Voucher {
  @Column({ name: 'voucherid', type: 'int' })
  @PrimaryColumn({ primaryKeyConstraintName: 'pk_voucherid' })
  voucherid: number

  @Column({ name: 'accountid', type: 'int', nullable: false })
  accountid: number

  @Column({ name: 'amount', type: 'numeric', precision: 12, scale: 2 })
  amount: number

  @Column({ name: 'naration', type: 'varchar', length: 128, nullable: true })
  naration: string

  @ManyToOne(() => Account, (a) => a.vouchers)
  @JoinColumn({
    name: 'accountid',
    referencedColumnName: 'accountid',
    foreignKeyConstraintName: 'fk_account_voucher'
  })
  accountVoucher: Account
}
