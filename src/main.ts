import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from "@nestjs/common"
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    credentials: true,
    origin: true
  })

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser())
  await app.listen(5000)
}
bootstrap()
