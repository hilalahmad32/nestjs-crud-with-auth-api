import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
})


export class ProductDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    price: number;

}