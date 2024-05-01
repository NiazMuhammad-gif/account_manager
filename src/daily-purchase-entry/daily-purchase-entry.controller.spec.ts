import { Test, TestingModule } from '@nestjs/testing'
import { DailyPurchaseEntryController } from './daily-purchase-entry.controller'
import { DailyPurchaseEntryService } from './daily-purchase-entry.service'

describe('DailyPurchaseEntryController', () => {
  let controller: DailyPurchaseEntryController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyPurchaseEntryController],
      providers: [DailyPurchaseEntryService]
    }).compile()

    controller = module.get<DailyPurchaseEntryController>(
      DailyPurchaseEntryController
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
