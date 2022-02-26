import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductDto } from './model/product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @UseGuards(JwtAuthGuard)
    @Post("products")
    createProduct(@Req() req: Request, @Body() dto: ProductDto) {
        return this.productService.createProduct(req.user, dto)
    }

    @Get("products")
    getProduct() {
        return this.productService.getProduct()
    }

    @Put("products/:id")
    editProduct(@Param() params: any) {
        return this.productService.editProduct(params.id);
    }

    @Patch("products/:id")
    updateProduct(@Param() params: any, @Body() dto: ProductDto) {
        return this.productService.updateProduct(params.id, dto);
    }

    @Delete("products/:id")
    deleteProduct(@Param() params: any) {
        return this.productService.deleteProduct(params.id);
    }
}
