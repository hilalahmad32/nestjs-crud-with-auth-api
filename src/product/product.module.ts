import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productSchema } from './model/product.model';

@Module({
  imports: [MongooseModule.forFeature([{
    name: "Product",
    schema: productSchema
  }])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule { }
