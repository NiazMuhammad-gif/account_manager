import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Schema } from 'src/storage/storage.module'
import { StorageService } from 'src/storage/storage.service'
import { DataSource } from 'typeorm'
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { AccountRequest } from './account.model'
import { Account } from 'src/storage/entities/account.entity'
import * as g from 'type-guards'
@Injectable()
export class AccountService {
  private readonly accountid_nextId: () => Promise<number>
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger,
    private readonly ds: DataSource,
    storage: StorageService,
  ) {
    this.accountid_nextId = storage.buildSequencer(Schema, 'accountid')
  }
  async create(req: AccountRequest) {

    const accountId = await this.accountid_nextId()
    await this.ds.transaction(async (trx) => {
      const data = {
        accountid: accountId,
        accounttypeid: req.accountTypeId,
        address: req.address,
        amount: req.amount ?? 0,
        cityid: req.cityId,
        detail: req.detail,
        email: req.email,
        fax: req.fax,
        telephone: req.telephone,
        phone: req.phone,
        title: req.title
      } as Account

      await trx.getRepository(Account).save(data)

    })

    return { id: accountId }
  }

  async findAll() {
    const accountData = await this.ds.getRepository(Account).find({
      relations: ['accountType', 'accountCity']
    })
    return { rows: accountData, total: accountData.length }
  }

  async findOne(id: number) {
    const accountData = await this.ds.getRepository(Account).findOne({
      relations: ['accountType', 'accountCity'],
      where: {
        accountid: id
      }
    })
    if (g.isNullOrUndefined(accountData)) {
      throw new BadRequestException(`account with the id ${id} not found`)
    }
    return accountData
  }

  async update(id: number, req: AccountRequest) {
    const accountData = await this.ds.getRepository(Account).findOne({
      where: {
        accountid: id
      }
    })

    if (g.isNullOrUndefined(accountData)) {
      throw new BadRequestException(`account with the id ${id} not found`)
    }

    const data = {
      accountid: accountData.accountid,
      accounttypeid: req.accountTypeId ?? accountData.accounttypeid,
      address: req.address ?? accountData.address,
      amount: req.amount ?? accountData.amount,
      cityid: req.cityId ?? accountData.cityid,
      detail: req.detail ?? accountData.detail,
      email: req.email ?? accountData.email,
      fax: req.fax ?? accountData.fax,
      telephone: req.telephone ?? accountData.telephone,
      phone: req.phone ?? accountData.phone,
      title: req.title ?? accountData.title
    } as Account

    this.ds.getRepository(Account).save(data)
  }

  async remove(id: number) {
    const accountData = await this.ds.getRepository(Account).findOne({
      where: {
        accountid: id
      }
    })
    if (g.isNullOrUndefined(accountData)) {
      throw new BadRequestException(`account with the id ${id} not found`)
    }

    await this.ds.getRepository(Account).remove(accountData)
    return `account with the id ${id} deleted successfully`
  }
}
