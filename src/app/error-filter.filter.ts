import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject
} from '@nestjs/common'
import { Response } from 'express'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

const GENERIC_MESSAGE = 'internal system error, please check the service logs'

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly log: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR

    let json = {
      code: status as HttpStatus,
      time: new Date().toISOString(),
      message: ''
    }
    if (exception.status === 400) {
      json = exception.response
      status = 400
    } else if (exception instanceof HttpException) {
      const { message, name, stack } = exception as HttpException
      this.record(message, name, stack!, (x) => (json.message = x))
      console.log(exception.getResponse())
      status = exception.getStatus() as HttpStatus
    } else if (exception instanceof Error) {
      const { message, name, stack } = exception as Error
      this.record(
        message,
        name,
        stack!,
        (x) => (json.message = GENERIC_MESSAGE)
      )
    }

    json.code = status
    response.status(status).json(json)
  }

  private record(
    message: string,
    name: string,
    stack: string,
    setMessage: (x: string) => void
  ) {
    this.log.error(message, name, stack)
    setMessage(message)
  }
}
