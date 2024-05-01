import { Test, TestingModule } from '@nestjs/testing'
import { DailySalesEntryService } from './daily-sales-entry.service'

describe('DailySalesEntryService', () => {
  let service: DailySalesEntryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailySalesEntryService]
    }).compile()

    service = module.get<DailySalesEntryService>(DailySalesEntryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
