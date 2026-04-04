import { Controller, Post, Body, Headers, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("sign-up")
  sign_up(@Body() signUpCreadentials: { email: string, password: string, phone?: string }) {
    return this.authService.sign_up(signUpCreadentials);
  }

  @Post("sign-in")
  sign_in(@Body() signInCreadentials: { email: string, password: string }) {
    return this.authService.sign_in(signInCreadentials);
  }

  @Post("sign-out")
  sign_out(@Headers('authorization') auth: string) {
    const token = auth?.split(' ')[1];
    return this.authService.sign_out(token);
  }

  @Get("user")
  findUserByEmail(@Headers('authorization') auth: string) {
    const token = auth?.split(' ')[1];
    return this.authService.findUserByEmail(token);
  }

  @Get("protected")
  getAllUsers() {
    return this.authService.getAllUsers();
  }
}
