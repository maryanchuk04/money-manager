import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //signup
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async addUser(
    @Body('password') userPassword: string,
    @Body('email') userEmail: string,
    @Body('name') userName: string,
  ) {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
      const result = await this.usersService.insertUser(
        userEmail,
        hashedPassword,
        userName,
      );
      return {
        msg: 'User successfully registered',
        userId: result.id,
        email: result.email,
        name: result.name,
      };
    } catch (error) {
      if (error.status === 409) {
        throw new HttpException(
          'Користувач з таким email вже існує',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  //Post / email
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  email(@Request() req): any {
    return { User: req.user, msg: 'User logged in' };
  }
  //Get / protected
  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user;
  }
  //Get / logout
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
