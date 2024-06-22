import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kafkaOptionsFactory } from './config/kafka/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix(config.get('HTTP_PREFIX'));

  // kafka
  app.connectMicroservice<MicroserviceOptions>(kafkaOptionsFactory());

  // swagger
  const configSwagger = new DocumentBuilder()
    .setTitle(`${config.get('SERVICE_NAME')} microservice`)
    .setDescription('API Documentation')
    .addServer(
      `http://${config.get('HTTP_HOST')}:${config.get('HTTP_PORT')}${config.get('HTTP_PREFIX')}`,
    )
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup(`${config.get('HTTP_PREFIX')}/docs`, app, document);

  // подписка на брокер сообщений
  await app.startAllMicroservices();

  await app.listen(config.get('HTTP_PORT'));
}
bootstrap();
