import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Từ Tâm Thiện Nguyện API')
    .setDescription('API nền tảng từ thiện minh bạch')
    .setVersion('1.0')
    .addTag('charities')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Validation pipe toàn cục
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Bỏ field không có trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu field dư
      transform: true, // Tự chuyển đổi kiểu dữ liệu
    }),
  );

  // Global Interceptor cho success response
  app.useGlobalInterceptors(new TransformInterceptor());

  //Global Filter cho tất cả exception
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server is running at: http://localhost:${port}`);
  console.log(
    `📘 Swagger docs available at: http://localhost:${port}/api/docs`,
  );
}
void bootstrap();
