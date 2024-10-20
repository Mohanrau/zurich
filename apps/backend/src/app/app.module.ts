import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product/entity';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { RoleCheckMiddleware } from '../middleware/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'MOTOR_INSURANCE_WEBSITE',
      entities: [Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
@Module({
  imports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RoleCheckMiddleware)
      .exclude({ path: 'product', method: RequestMethod.GET })
      .forRoutes(ProductController);
  }
}
