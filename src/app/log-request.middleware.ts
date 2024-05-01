import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

/**
 * This middleware records the endpoint that is requested from the service and
 * logs who:cientIP requested what:url
 */
@Injectable()
export class LogRequestMiddleware implements NestMiddleware {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly log: Logger) {}

  private getUrl(req: Request) {
    const url = `${req.protocol ?? 'http'}://${req.get('Host') ?? ''}${req.originalUrl}`

    return url ?? ''
  }

  use(req: Request, _: Response, next: NextFunction) {
    const url = this.getUrl(req)
    const client = req.socket.remoteAddress ?? 'unknown'

    this.log.info(
      `${client} visits [${String(req.method).toUpperCase()}] ${url}`
    )

    next()
  }
}
