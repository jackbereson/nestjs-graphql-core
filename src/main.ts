import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { configs } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  await app.listen(configs.port);
  new Logger('NestApplication').debug(`Application start at ${configs.domain}`);
}
bootstrap();
