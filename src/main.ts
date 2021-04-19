import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { registerSwagger } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  registerSwagger(app);

  await app.listen(3000);
}
bootstrap();
