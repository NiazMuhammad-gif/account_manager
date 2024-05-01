import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { VoucherRequest } from './voucher.model';
import { Voucher } from 'src/storage/entities/voucher.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Schema } from 'src/storage/storage.module';
import { StorageService } from 'src/storage/storage.service';
import { DataSource } from 'typeorm';
import * as g from 'type-guards'
@Injectable()
export class VoucherService {
  private readonly voucherid_nextId: () => Promise<number>
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger,
    private readonly ds: DataSource,
    storage: StorageService,
  ) {
    this.voucherid_nextId = storage.buildSequencer(Schema, 'voucherid')
  }
  async create(req: VoucherRequest) {
    const voucherId = await this.voucherid_nextId()
    await this.ds.transaction(async (trx) => {
      const data = {
        voucherid: voucherId,
        accountid: req.accountId,
        amount: req.amount,
        naration: req.naration
      } as Voucher

      await trx.getRepository(Voucher).save(data)

    })

    return { id: voucherId }
  }

  async findAll() {
    const voucherData = await this.ds.getRepository(Voucher).find({
    })
    return { rows: voucherData, total: voucherData.length }
  }

  async findOne(id: number) {
    const voucherData = await this.ds.getRepository(Voucher).findOne({
      where: {
        voucherid: id
      }
    })
    if (g.isNullOrUndefined(voucherData)) {
      throw new BadRequestException(`voucher with the id ${id} not found`)
    }
    return voucherData
  }

  async update(id: number, req: VoucherRequest) {
    const voucherData = await this.ds.getRepository(Voucher).findOne({
      where: {
        voucherid: id
      }
    })

    if (g.isNullOrUndefined(voucherData)) {
      throw new BadRequestException(`voucher with the id ${id} not found`)
    }

    const data = {
      voucherid: voucherData.voucherid,
      accountid: req.accountId,
      amount: req.amount,
      naration: req.naration

    } as Voucher

    await this.ds.getRepository(Voucher).save(data)

    return { id: voucherData.voucherid }
  }

  async remove(id: number) {
    const voucherData = await this.ds.getRepository(Voucher).findOne({
      where: {
        voucherid: id
      }
    })
    if (g.isNullOrUndefined(voucherData)) {
      throw new BadRequestException(`voucher with the id ${id} not found`)
    }

    await this.ds.getRepository(Voucher).remove(voucherData)
    return `voucher with the id ${id} deleted successfully`
  }
}
