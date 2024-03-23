import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
class ConflictError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 409;
  }
}

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
  async insertUser(userEmail: string, password: string, name: string) {
    const email = userEmail.toLowerCase();

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictError('Користувач з таким email вже існує');
    }

    try {
      const newUser = new this.userModel({
        email,
        password,
        name,
      });

      await newUser.save();

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUser(userEmail: string) {
    const email = userEmail.toLowerCase();
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
