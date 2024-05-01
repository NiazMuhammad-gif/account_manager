import { Inject } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import _ from 'underscore'
export class StorageService {
  constructor(@Inject(EntityManager) private readonly ds: EntityManager) { }

  private async nextValue(schema: string, sequence: string) {
    const name = !!schema ? `${schema}.${sequence}` : `${sequence}`
    const result = await this.ds.query(`SELECT NEXTVAL('${name}') as num`)
    const { num } = _.first(result)
    return num
  }
  // private async currentValue(schema: string, sequence: string) {
  //   const name = !!schema ? `${schema}.${sequence}` : `${sequence}`
  //   const result = await this.ds.query(`SELECT CURRVAL('${name}') as num`)
  //   const { num } = _.first(result)
  //   return num
  // }

  buildSequencer(schema: string, name: string): () => Promise<number> {
    return () => this.nextValue(schema, name)
  }
}
