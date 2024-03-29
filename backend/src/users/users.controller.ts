import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  HttpCode,
  HttpStatus,
  HttpException,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { TransactionType } from './users.model';
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

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') userId: string) {
    try {
      const user = await this.usersService.getUserById(userId);
      return user;
    } catch (error) {
      throw new HttpException('Щось пішло не так', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/update-user-name')
  @HttpCode(HttpStatus.OK)
  async updateUserName(
    @Body('id') userId: string,
    @Body('name') userName: string,
  ) {
    try {
      const updateUser = await this.usersService.updateUserName(
        userId,
        userName,
      );

      return updateUser;
    } catch (error) {
      throw new HttpException('Щось пішло не так', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/transaction')
  @HttpCode(HttpStatus.OK)
  async addTransaction(
    @Body('userId') userId: string,
    @Body('amount') amount: number,
    @Body('date') date: Date,
    @Body('type') type: TransactionType,
    @Body('description') description: string,
  ) {
    try {
      const message = await this.usersService.addTransaction(userId, {
        amount: +amount,
        date: date,
        type: type,
        description: description,
      });
      return message;
    } catch (error) {
      throw new HttpException('Щось пішло не так', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:userId/transaction/:transactionId')
  @HttpCode(HttpStatus.OK)
  async deleteTransaction(
    @Param('userId') userId: string,
    @Param('transactionId') transactionId: string,
  ) {
    try {
      const message = await this.usersService.deleteTransaction(
        userId,
        transactionId,
      );
      return message;
    } catch (error) {
      throw new HttpException('Щось пішло не так', HttpStatus.BAD_REQUEST);
    }
  }
  ////////////////////////////////////////////////////////////

  //Get / logout
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
