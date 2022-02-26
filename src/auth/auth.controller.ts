import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SignInDto, SignUpDto } from './model/user.model';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post("signup")
    create(@Body() dto: SignUpDto) {
        return this.authService.create(dto);
    }

    @Post("signin")
    login(@Body() dto: SignInDto) {
        return this.authService.login(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    profile(@Req() req: Request) {
        return this.authService.profile(req.user)
    }
}
