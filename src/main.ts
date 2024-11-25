import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from 'guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //app.useGlobalGuards(new RolesGuard(new Reflector()));
  await app.listen(3000);
}
bootstrap();
