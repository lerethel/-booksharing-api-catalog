import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ParseIntGlobalPipe } from './common/pipes/parse-int-global.pipe';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
        // If 'catalog' is used, the gateway can't connect to the microservice.
        host: '0.0.0.0',
      },
    },
  );

  app.useGlobalPipes(new ParseIntGlobalPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen();
}
bootstrap();
