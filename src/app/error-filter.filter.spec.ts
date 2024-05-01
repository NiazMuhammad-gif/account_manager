import { createLogger, Logger } from 'winston'

import { ErrorFilter } from './error-filter.filter'

describe('ErrorFilterFilter', () => {
  const logger: Logger = createLogger()

  it('should be defined', () => expect(new ErrorFilter(logger)).toBeDefined())
})
