import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Warehouse } from 'src/storage/entities/warehouse.entity'
import { Schema } from 'src/storage/storage.module'
import { StorageService } from 'src/storage/storage.service'
import * as g from 'type-guards'
import { DataSource } from 'typeorm'
import { WarehouseRequest } from './warehouse.model'
@Injectable()
export class WarehouseService {
  private readonly warehouseid_nextId: () => Promise<number>
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger,
    private readonly ds: DataSource,
    storage: StorageService,
  ) {
    this.warehouseid_nextId = storage.buildSequencer(Schema, 'warehouseid')
  }
  async create(req: WarehouseRequest) {
    const warehouseid = await this.warehouseid_nextId()
    await this.ds.transaction(async (trx) => {
      const data = {
        warehouseid: warehouseid,
        code: req.code,
        name: req.name,
      } as Warehouse

      await trx.getRepository(Warehouse).save(data)

    })

    return { id: warehouseid }
  }

  async findAll() {
    const warehouseData = await this.ds.getRepository(Warehouse).find({
    })
    return { rows: warehouseData, total: warehouseData.length }
  }

  async findOne(id: number) {
    const warehouseData = await this.ds.getRepository(Warehouse).findOne({
      where: {
        warehouseid: id
      }
    })
    if (g.isNullOrUndefined(warehouseData)) {
      throw new BadRequestException(`Warehouse with the id ${id} not found`)
    }
    return warehouseData
  }

  async update(id: number, req: WarehouseRequest) {
    const warehouseData = await this.ds.getRepository(Warehouse).findOne({
      where: {
        warehouseid: id
      }
    })

    if (g.isNullOrUndefined(warehouseData)) {
      throw new BadRequestException(`Warehouse with the id ${id} not found`)
    }

    const data = {
      warehouseid: warehouseData.warehouseid,
      code: req.code,
      name: req.name,
    } as Warehouse

    await this.ds.getRepository(Warehouse).save(data)

    return { id: warehouseData.warehouseid }
  }

  async remove(id: number) {
    const warehouseData = await this.ds.getRepository(Warehouse).findOne({
      where: {
        warehouseid: id
      }
    })
    if (g.isNullOrUndefined(warehouseData)) {
      throw new BadRequestException(`Warehouse with the id ${id} not found`)
    }

    await this.ds.getRepository(Warehouse).remove(warehouseData)
    return `warehouse with the id ${id} deleted successfully`
  }
}
