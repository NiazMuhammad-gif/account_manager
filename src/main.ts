import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { INestApplication, LoggerService, ValidationPipe } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

async function bootstrap() {
  console.log(`initializing ... `)

  const app: INestApplication = await NestFactory.create(AppModule, {
    abortOnError: true,
    autoFlushLogs: true
  })
  const log = app.get(WINSTON_MODULE_NEST_PROVIDER) as LoggerService
  app.useLogger(log)
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      whitelist: true
    })
  )
  const port = process.env['SERVICE_PORT'] ? process.env['SERVICE_PORT'] : '80'
  const host = process.env['SERVICE_HOST']
    ? process.env['SERVICE_HOST']
    : '0.0.0.0'
  await app.listen(port, host, async () => {
    const url = await app.getUrl()
    log.log(`account service is listening at ${url}`)
  })
}
bootstrap()
