import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  await app.listen(3000);
  console.log(`Application running at ${await app.getUrl()}`)
}
bootstrap();
