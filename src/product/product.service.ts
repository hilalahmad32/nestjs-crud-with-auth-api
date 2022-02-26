import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ProductDto } from './model/product.model';
import { Model } from 'mongoose'
@Injectable()
export class ProductService {
    constructor(@InjectModel("Product") private productModel: Model<ProductDto>) { }

    async createProduct(id, dto: ProductDto) {
        const products = new this.productModel({
            title: dto.title,
            content: dto.content,
            price: dto.price,
            user: id.id
        })

        const result = await products.save();
        if (result) {
            return {
                success: true,
                msg: "Product Create Successfully"
            }
        } else {
            return {
                success: false,
                msg: "Server problem"
            }
        }
    }


    async getProduct() {
        const products = await this.productModel.find().
            populate({ path: 'user', select: ["name"] });
        if (products) {
            return {
                success: true,
                products: products
            }
        } else {
            return {
                success: false,
                products: "Server Problem"
            }
        }
    }

    async editProduct(id) {
        const products = await (await this.productModel.findById({ _id: id }));
        if (products) {
            return {
                success: true,
                products: products
            }
        } else {
            return {
                success: false,
                products: "Server Problem"
            }
        }
    }


    async updateProduct(id, dto: ProductDto) {
        const products = await this.productModel.findByIdAndUpdate({ _id: id }, {
            title: dto.title,
            content: dto.content,
            price: dto.price,
        });
        if (products) {
            return {
                success: true,
                msg: "Product Update Successfully"
            }
        } else {
            return {
                success: false,
                msg: "Server Problem"
            }
        }
    }

    async deleteProduct(id) {
        const products = await this.productModel.findByIdAndDelete({ _id: id });
        if (products) {
            return {
                success: true,
                msg: "Product Delete Successfully"
            }
        } else {
            return {
                success: false,
                msg: "Server Problem"
            }
        }
    }
}
