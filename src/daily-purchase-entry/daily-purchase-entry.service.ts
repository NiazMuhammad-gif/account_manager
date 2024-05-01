import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { DailyPurchaseRequest } from './daily_purchase_entry.model'
import { DailyPurchaseEntry } from 'src/storage/entities/daily-purchase-entry.entity'
import * as g from 'type-guards'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Account } from 'src/storage/entities/account.entity'
import { Item } from 'src/storage/entities/item.entity'
import { Warehouse } from 'src/storage/entities/warehouse.entity'
import { Schema } from 'src/storage/storage.module'
import { StorageService } from 'src/storage/storage.service'
import { DataSource } from 'typeorm'
@Injectable()
export class DailyPurchaseEntryService {
  private readonly salesdocumentid_nextId: () => Promise<number>
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger,
    private readonly ds: DataSource,
    storage: StorageService,
  ) {
    this.salesdocumentid_nextId = storage.buildSequencer(Schema, 'purchasedocumentid')
  }
  async create(req: DailyPurchaseRequest) {
    const dailySalesId = await this.salesdocumentid_nextId()
    await this.ds.transaction(async (trx) => {
      const itemData = await trx.getRepository(Item).findOne({
        where: {
          itemid: req.itemId
        }
      })
      if (g.isNullOrUndefined(itemData)) {
        throw new BadRequestException(`itemData with the id ${req.itemId} not found`)
      }
      const accountData = await trx.getRepository(Account).findOne({
        where: {
          accountid: req.accountId
        }
      })
      if (g.isNullOrUndefined(accountData)) {
        throw new BadRequestException(`accountData with the id ${req.accountId} not found`)
      }
      const warehouseData = await trx.getRepository(Warehouse).findOne({
        where: {
          warehouseid: req.warehouseId
        }
      })
      if (g.isNullOrUndefined(warehouseData)) {
        throw new BadRequestException(`warehouseData with the id ${req.warehouseId} not found`)
      }

      const supplierData = await trx.getRepository(Account).findOne({
        relations: ['accountType'],
        where: {
          accountid: req.supplierId,
          accountType: {
            accountTitle: 'Supplier'
          }
        }
      })
      if (g.isNullOrUndefined(supplierData)) {
        throw new BadRequestException(`supplierData with the id ${req.supplierId} not found`)
      }
      const data = {
        purchasedocumentid: dailySalesId,
        amount: req.amount,
        accountid: req.accountId,
        itemid: req.itemId,
        supplierid: req.supplierId,
        warehouseid: req.warehouseId,
        bale: req.bale,
        baleType: req.baleType,
        date: new Date(),
        quantity: req.quantity,
        rate: req.rate,
      } as unknown as DailyPurchaseEntry

      await trx.getRepository(DailyPurchaseEntry).save(data)

    })

    return { id: dailySalesId }
  }

  async findAll() {
    const dailySalesData = await this.ds.getRepository(DailyPurchaseEntry).find({
    })
    return { rows: dailySalesData, total: dailySalesData.length }
  }

  async findOne(id: number) {
    const dailySalesData = await this.ds.getRepository(DailyPurchaseEntry).findOne({
      where: {
        purchasedocumentid: id
      }
    })
    if (g.isNullOrUndefined(dailySalesData)) {
      throw new BadRequestException(`accounttype with the id ${id} not found`)
    }
    return dailySalesData
  }

  async update(id: number, req: DailyPurchaseRequest) {
    const dailySalesData = await this.ds.getRepository(DailyPurchaseEntry).findOne({
      where: {
        purchasedocumentid: id
      }
    })

    if (g.isNullOrUndefined(dailySalesData)) {
      throw new BadRequestException(`accounttype with the id ${id} not found`)
    }

    const itemData = await this.ds.getRepository(Item).findOne({
      where: {
        itemid: req.itemId
      }
    })
    if (g.isNullOrUndefined(itemData)) {
      throw new BadRequestException(`itemData with the id ${req.itemId} not found`)
    }
    const accountData = await this.ds.getRepository(Account).findOne({
      where: {
        accountid: req.accountId
      }
    })
    if (g.isNullOrUndefined(accountData)) {
      throw new BadRequestException(`accountData with the id ${req.accountId} not found`)
    }
    const warehouseData = await this.ds.getRepository(Warehouse).findOne({
      where: {
        warehouseid: req.warehouseId
      }
    })
    if (g.isNullOrUndefined(warehouseData)) {
      throw new BadRequestException(`warehouseData with the id ${req.warehouseId} not found`)
    }

    const supplierData = await this.ds.getRepository(Account).findOne({
      relations: ['accountType'],
      where: {
        accountid: req.supplierId,
        accountType: {
          accountTitle: 'Supplier'
        }
      }
    })
    if (g.isNullOrUndefined(supplierData)) {
      throw new BadRequestException(`supplierData with the id ${req.supplierId} not found`)
    }

    const data = {
      purchasedocumentid: id,
      amount: req.amount,
      accountid: req.accountId,
      bale: req.bale,
      baleType: req.baleType,
      date: new Date(),
      itemid: req.itemId,
      quantity: req.quantity,
      rate: req.rate,
      supplierid: req.supplierId,
      warehouseid: req.warehouseId,
    } as unknown as DailyPurchaseEntry

    await this.ds.getRepository(DailyPurchaseEntry).save(data)

    return { id: dailySalesData.purchasedocumentid }
  }

  async remove(id: number) {
    const dailySalesData = await this.ds.getRepository(DailyPurchaseEntry).findOne({
      where: {
        purchasedocumentid: id
      }
    })
    if (g.isNullOrUndefined(dailySalesData)) {
      throw new BadRequestException(`Entry with the id ${id} not found`)
    }

    await this.ds.getRepository(DailyPurchaseEntry).remove(dailySalesData)
    return `Entry with the id ${id} deleted successfully`
  }
}
