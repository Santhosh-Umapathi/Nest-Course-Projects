import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      //Removes extra properties from the body ,only the properties defined in the DTO will be accepted
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
