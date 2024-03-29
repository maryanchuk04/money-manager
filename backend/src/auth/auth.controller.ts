import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //Post / email
  @Post('/login')
  async login(
    @Body('password') userPassword: string,
    @Body('email') userEmail: string,
  ) {
    try {
      const user = await this.authService.validateUser(userEmail, userPassword);

      return {
        msg: 'User successfully login',
        id: user.id,
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      throw new HttpException(
        'Неправильний логін або пароль',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
