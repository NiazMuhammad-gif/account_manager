import { createLogger, format } from 'winston'
import { Request, Response } from 'express'
import { LogRequestMiddleware } from './log-request.middleware'

describe('LogRequestMiddleware', () => {
  const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [],
    silent: true
  })

  const myInfo = jest.spyOn(logger, 'info')
  const middleware = new LogRequestMiddleware(logger)

  it('should be defined', () => {
    expect(middleware).toBeDefined()
  })

  it('should log a request', () => {
    const req = {
      get: (x: string) => x,
      protocol: 'http',
      originalUrl: 'http://localhost',
      socket: {
        remoteAddress: '127.0.0.1'
      }
    } as Request
    const res = {} as Response

    middleware.use(req, res, () => {})
    expect(myInfo).toHaveBeenCalledTimes(1)
  })
})
