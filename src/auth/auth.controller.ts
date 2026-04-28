import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  CreateProfileDto, UpdateProfileDto } from './dto/creadetial.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  signUp(@Body() creadentials: CreateProfileDto){
    return this.authService.signUp(creadentials)
  }

  @Post("sign-in")
  signIn(@Body() signInDto: UpdateProfileDto){
    return this.authService.signIn(signInDto)
  }
}
