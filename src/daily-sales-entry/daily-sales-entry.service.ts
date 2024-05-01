import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { DailySalesRequest } from './daily_sales_entry.model'
import { DailySalesEntry } from 'src/storage/entities/daily-sales-entry.entity'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Schema } from 'src/storage/storage.module'
import { StorageService } from 'src/storage/storage.service'
import { DataSource } from 'typeorm'
import * as g from 'type-guards'
import { Item } from 'src/storage/entities/item.entity'
import { Account } from 'src/storage/entities/account.entity'
import { Warehouse } from 'src/storage/entities/warehouse.entity'
@Injectable()
export class DailySalesEntryService {
  private readonly salesdocumentid_nextId: () => Promise<number>
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger,
    private readonly ds: DataSource,
    storage: StorageService,
  ) {
    this.salesdocumentid_nextId = storage.buildSequencer(Schema, 'salesdocumentid')
  }
  async create(req: DailySalesRequest) {
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
        salesdocumentid: dailySalesId,
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
      } as unknown as DailySalesEntry

      await trx.getRepository(DailySalesEntry).save(data)

    })

    return { id: dailySalesId }
  }

  async findAll() {
    const dailySalesData = await this.ds.getRepository(DailySalesEntry).find({
    })
    return { rows: dailySalesData, total: dailySalesData.length }
  }

  async findOne(id: number) {
    const dailySalesData = await this.ds.getRepository(DailySalesEntry).findOne({
      where: {
        salesdocumentid: id
      }
    })
    if (g.isNullOrUndefined(dailySalesData)) {
      throw new BadRequestException(`accounttype with the id ${id} not found`)
    }
    return dailySalesData
  }

  async update(id: number, req: DailySalesRequest) {
    const dailySalesData = await this.ds.getRepository(DailySalesEntry).findOne({
      where: {
        salesdocumentid: id
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
      salesdocumentid: id,
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
    } as unknown as DailySalesEntry

    await this.ds.getRepository(DailySalesEntry).save(data)

    return { id: dailySalesData.salesdocumentid }
  }

  async remove(id: number) {
    const dailySalesData = await this.ds.getRepository(DailySalesEntry).findOne({
      where: {
        salesdocumentid: id
      }
    })
    if (g.isNullOrUndefined(dailySalesData)) {
      throw new BadRequestException(`Entry with the id ${id} not found`)
    }

    await this.ds.getRepository(DailySalesEntry).remove(dailySalesData)
    return `Entry with the id ${id} deleted successfully`
  }
}
