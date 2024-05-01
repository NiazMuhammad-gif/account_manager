import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { CityRequest } from './city.model'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Schema } from 'src/storage/storage.module'
import { StorageService } from 'src/storage/storage.service'
import { DataSource } from 'typeorm'
import { City } from 'src/storage/entities/city.entity'
import * as g from 'type-guards'
@Injectable()
export class CityService {
  private readonly cityid_nextId: () => Promise<number>
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger,
    private readonly ds: DataSource,
    storage: StorageService,
  ) {
    this.cityid_nextId = storage.buildSequencer(Schema, 'cityid')
  }
  async create(req: CityRequest) {
    const cityId = await this.cityid_nextId()
    await this.ds.transaction(async (trx) => {
      const data = {
        cityid: cityId,
        name: req.name
      } as City

      await trx.getRepository(City).save(data)

    })

    return { id: cityId }
  }

  async findAll() {
    const cityData = await this.ds.getRepository(City).find({
    })
    return { rows: cityData, total: cityData.length }
  }

  async findOne(id: number) {
    const cityData = await this.ds.getRepository(City).findOne({
      where: {
        cityid: id
      }
    })
    if (g.isNullOrUndefined(cityData)) {
      throw new BadRequestException(`city with the id ${id} not found`)
    }
    return cityData
  }

  async update(id: number, req: CityRequest) {
    const cityData = await this.ds.getRepository(City).findOne({
      where: {
        cityid: id
      }
    })

    if (g.isNullOrUndefined(cityData)) {
      throw new BadRequestException(`city with the id ${id} not found`)
    }

    const data = {
      cityid: cityData.cityid,
      name: req.name
    } as City

    await this.ds.getRepository(City).save(data)

    return { id: cityData.cityid }
  }

  async remove(id: number) {
    const accountData = await this.ds.getRepository(City).findOne({
      where: {
        cityid: id
      }
    })
    if (g.isNullOrUndefined(accountData)) {
      throw new BadRequestException(`city with the id ${id} not found`)
    }

    await this.ds.getRepository(City).remove(accountData)
    return `city with the id ${id} deleted successfully`
  }
}
