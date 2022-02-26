import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot("mongodb+srv://hilalahmad:hilalahmad@cluster0.fzn2l.mongodb.net/nestjs_sveltejs?retryWrites=true&w=majority"), ProductModule],
})
export class AppModule { }
