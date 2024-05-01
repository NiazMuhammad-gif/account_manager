import { Test, TestingModule } from '@nestjs/testing'
import { DailyPurchaseEntryService } from './daily-purchase-entry.service'

describe('DailyPurchaseEntryService', () => {
  let service: DailyPurchaseEntryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyPurchaseEntryService]
    }).compile()

    service = module.get<DailyPurchaseEntryService>(DailyPurchaseEntryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
