import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("sign-up")
  sign_up(@Body() signUpCreadentials: CreateAuthDto) {
    return this.authService.sign_up(signUpCreadentials);
  }

  @Post("sign-in")
  sign_in(@Body() signInCreadentials: CreateAuthDto) {
    return this.authService.sign_in(signInCreadentials);
  }

  @Post("sign-out")
  sign_out() {
    return this.authService.sign_out();
  }
}
