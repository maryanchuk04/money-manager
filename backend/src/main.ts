import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // add multiple origins here
    origin: true,
    // origin: [
    //   'http://localhost:5173',
    //   'http://192.168.0.105:5173',
    //   'https://money-manager-ivory.vercel.app',
    // ],
  });
  app.use(
    session({
      secret: 'keyboard',
      resave: false,
      saveUninitialized: false,
    }),
  );

  passport.initialize();
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
