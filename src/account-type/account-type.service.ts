import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { AccountTypeRequest } from './account-type.model'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Schema } from 'src/storage/storage.module'
import { StorageService } from 'src/storage/storage.service'
import { DataSource } from 'typeorm'
import { AccountType } from 'src/storage/entities/account-type.entity'
import * as g from 'type-guards'

@Injectable()
export class AccountTypeService {
  private readonly accounttypeid_nextId: () => Promise<number>
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger,
    private readonly ds: DataSource,
    storage: StorageService,
  ) {
    this.accounttypeid_nextId = storage.buildSequencer(Schema, 'accounttypeid')
  }
  async create(req: AccountTypeRequest) {
    const accountTypeId = await this.accounttypeid_nextId()
    await this.ds.transaction(async (trx) => {
      const data = {
        accounttypeid: accountTypeId,
        accountTitle: req.accountTitle,
        accountType: req.accountType
      } as AccountType

      await trx.getRepository(AccountType).save(data)

    })

    return { id: accountTypeId }
  }

  async findAll() {
    const accountTypeData = await this.ds.getRepository(AccountType).find({
    })
    return { rows: accountTypeData, total: accountTypeData.length }
  }

  async findOne(id: number) {
    const accountTypeData = await this.ds.getRepository(AccountType).findOne({
      where: {
        accounttypeid: id
      }
    })
    if (g.isNullOrUndefined(accountTypeData)) {
      throw new BadRequestException(`accounttype with the id ${id} not found`)
    }
    return accountTypeData
  }

  async update(id: number, req: AccountTypeRequest) {
    const accountTypeData = await this.ds.getRepository(AccountType).findOne({
      where: {
        accounttypeid: id
      }
    })

    if (g.isNullOrUndefined(accountTypeData)) {
      throw new BadRequestException(`accounttype with the id ${id} not found`)
    }

    const data = {
      accounttypeid: accountTypeData.accounttypeid,
      accountTitle: req.accountTitle,
      accountType: req.accountType
    } as AccountType

    await this.ds.getRepository(AccountType).save(data)

    return { id: accountTypeData.accounttypeid }
  }

  async remove(id: number) {
    const accountTypeData = await this.ds.getRepository(AccountType).findOne({
      where: {
        accounttypeid: id
      }
    })
    if (g.isNullOrUndefined(accountTypeData)) {
      throw new BadRequestException(`account type with the id ${id} not found`)
    }

    await this.ds.getRepository(AccountType).remove(accountTypeData)
    return `account type with the id ${id} deleted successfully`
  }
}
