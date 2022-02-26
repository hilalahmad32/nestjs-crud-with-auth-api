import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { SignInDto, SignUpDto } from './model/user.model';
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
    constructor(@InjectModel("User")
    private userModel: Model<SignUpDto | SignInDto>,
        private jwtService: JwtService) { }

    async create(dto: SignUpDto) {

        const is_email = await this.userModel.findOne({ email: dto.email });
        if (is_email) {
            return {
                success: true,
                msg: "Email already Exist"
            }
        } else {
            const hashPassword = await bcrypt.hash(dto.password, 12);
            const users = new this.userModel({
                name: dto.name,
                email: dto.email,
                password: hashPassword
            })
            const result = await users.save();
            if (result) {
                return {
                    success: true,
                    msg: "User Sign up Successfully"
                }
            } else {
                return {
                    success: false,
                    msg: "Some problem"
                }
            }
        }

    }

    async login(dto: SignInDto) {
        const users = await this.userModel.findOne({ email: dto.email });
        if (users) {
            const cPassword = await bcrypt.compare(dto.password, users.password);
            if (cPassword) {
                const payload = { id: users._id };
                const jwt = this.jwtService.sign(payload)
                return {
                    success: true,
                    msg: "Login Successfully",
                    jwt: jwt
                }
            } else {
                return {
                    success: false,
                    msg: "Invalid Email and Password"
                }
            }

        } else {
            return {
                success: false,
                msg: "Email not found"
            }
        }
    }

    async profile(id) {
        const users = await this.userModel.findById({ _id: id.id }).select("-password");
        return users;
    }
}
