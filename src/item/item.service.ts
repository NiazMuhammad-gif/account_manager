import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { ItemRequest } from './item.model'
import { Item } from 'src/storage/entities/item.entity'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Schema } from 'src/storage/storage.module'
import { StorageService } from 'src/storage/storage.service'
import { DataSource } from 'typeorm'
import * as g from 'type-guards'
@Injectable()
export class ItemService {
  private readonly itemid_nextId: () => Promise<number>
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger,
    private readonly ds: DataSource,
    storage: StorageService,
  ) {
    this.itemid_nextId = storage.buildSequencer(Schema, 'itemid')
  }
  async create(req: ItemRequest) {
    const itemId = await this.itemid_nextId()
    await this.ds.transaction(async (trx) => {
      const data = {
        itemid: itemId,
        name: req.name,
        unit: req.unit,
        salePrice: req.salePrice
      } as Item

      await trx.getRepository(Item).save(data)

    })

    return { id: itemId }
  }

  async findAll() {
    const itemData = await this.ds.getRepository(Item).find({
    })
    return { rows: itemData, total: itemData.length }
  }

  async findOne(id: number) {
    const itemData = await this.ds.getRepository(Item).findOne({
      where: {
        itemid: id
      }
    })
    if (g.isNullOrUndefined(itemData)) {
      throw new BadRequestException(`accounttype with the id ${id} not found`)
    }
    return itemData
  }

  async update(id: number, req: ItemRequest) {
    const itemData = await this.ds.getRepository(Item).findOne({
      where: {
        itemid: id
      }
    })

    if (g.isNullOrUndefined(itemData)) {
      throw new BadRequestException(`accounttype with the id ${id} not found`)
    }

    const data = {
      itemid: itemData.itemid,
      name: req.name,
      salePrice: req.salePrice ?? itemData.salePrice,
      unit: req.unit
    } as Item

    await this.ds.getRepository(Item).save(data)

    return { id: itemData.itemid }
  }

  async remove(id: number) {
    const ItemData = await this.ds.getRepository(Item).findOne({
      where: {
        itemid: id
      }
    })
    if (g.isNullOrUndefined(ItemData)) {
      throw new BadRequestException(`accounttype with the id ${id} not found`)
    }

    await this.ds.getRepository(Item).remove(ItemData)
    return `account type with the id ${id} deleted successfully`
  }
}
