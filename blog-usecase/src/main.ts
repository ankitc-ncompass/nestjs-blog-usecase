import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomErrorFilter } from './error-handler.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomErrorFilter())
  await app.listen(3000);
}
bootstrap();
