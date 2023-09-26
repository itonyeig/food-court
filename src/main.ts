import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingMiddleware } from './middleware/logging.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggingMiddleware().use.bind(new LoggingMiddleware()));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
