import { Entity, Column, Unique, PrimaryColumn, OneToMany } from 'typeorm'
import { Account } from './account.entity'

@Entity()
@Unique(['accountType'])
export class AccountType {
  @Column({ name: 'accounttypeid', type: 'smallint' })
  @PrimaryColumn({ primaryKeyConstraintName: 'pk_accounttype' })
  accounttypeid: number

  @Column({ name: 'accounttype', type: 'char', length: 2 })
  accountType: string

  @Column({ name: 'accounttitle', type: 'varchar', length: 50 })
  accountTitle: string

  @OneToMany(() => Account, (a) => a.accountType)
  accountTypes: Account[]
}
