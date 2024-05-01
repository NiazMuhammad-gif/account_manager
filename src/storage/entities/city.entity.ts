import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { Account } from './account.entity'

@Entity()
export class City {
  @Column({ name: 'cityid', type: 'smallint' })
  @PrimaryColumn({ primaryKeyConstraintName: 'pk_cityid' })
  cityid: number

  @Column({ name: 'name', type: 'varchar', length: 48 })
  name: string

  @OneToMany(() => Account, (a) => a.accountCity)
  cities: Account[]
}
