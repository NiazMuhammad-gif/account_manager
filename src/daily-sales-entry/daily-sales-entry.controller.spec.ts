import { Test, TestingModule } from '@nestjs/testing'
import { DailySalesEntryController } from './daily-sales-entry.controller'
import { DailySalesEntryService } from './daily-sales-entry.service'

describe('DailySalesEntryController', () => {
  let controller: DailySalesEntryController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailySalesEntryController],
      providers: [DailySalesEntryService]
    }).compile()

    controller = module.get<DailySalesEntryController>(
      DailySalesEntryController
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
