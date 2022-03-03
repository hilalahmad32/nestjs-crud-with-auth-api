import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(""), ProductModule],
})
export class AppModule { }
