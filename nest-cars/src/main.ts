import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');
// import cookieSession from 'cookie-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //1st way of setting up global config
  app.use(
    cookieSession({
      keys: ['CookieSessionKey'],
    }),
  );

  //1st way of setting up global config
  app.useGlobalPipes(
    new ValidationPipe({
      //Removes extra properties from the body ,only the properties defined in the DTO will be accepted
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
