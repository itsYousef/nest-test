import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.use(csurf());
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true
  }));

  // ----------------------------------
  const config = new DocumentBuilder()
    .setTitle("test")
    .setDescription("The nest app API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.use("/api-docs", (_, res) => res.send(document))
  // ----------------------------------
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  // ----------------------------------

  await app.listen(4000);
}

bootstrap();
