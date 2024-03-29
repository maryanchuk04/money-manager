import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import { Transaction } from './users.model';
import mongoose from 'mongoose';

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

  async getUserById(userId: string) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error getting user data');
    }
  }

  async updateUserName(userId: string, newName: string) {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: userId },
        { name: newName },
        { new: true },
      );

      if (!updatedUser) {
        throw new Error('User not found');
      }
      return { message: 'User name updated successfully' };
    } catch (error) {
      throw new Error('Error updating user name: ' + error.message);
    }
  }

  async addTransaction(userId: string, newTransaction: Transaction) {
    try {
      const transactionId = new mongoose.Types.ObjectId();
      const result = await this.userModel.findOneAndUpdate(
        { _id: userId },
        { $push: { transactions: { _id: transactionId, ...newTransaction } } },
        { new: true },
      );

      if (!result) {
        throw new Error('User not found');
      }

      return { ...newTransaction, id: transactionId };
    } catch (error) {
      throw new Error('Error adding transaction: ' + error.message);
    }
  }

  // async deleteTransaction(userId: string, transactionId: string) {
  //   try {
  //     const user = await this.userModel.findById(userId);
  //     if (!user) {
  //       throw new Error('User not found');
  //     }
  //     console.log(user);
  //     // Фільтруємо транзакції, залишаючи лише ті, які не мають заданого _id
  //     user.transactions = user.transactions.filter((transaction) => {
  //       console.log(transaction._id.toString(), transactionId);
  //       console.log(typeof transaction._id, typeof transactionId);
  //       return transaction._id.toString() !== transactionId;
  //     });
  //     console.log(user);
  //     await user.save(); // Зберігаємо зміни

  //     return { message: 'Transaction deleted successfully' };
  //   } catch (error) {
  //     throw new Error('Error deleting transaction: ' + error.message);
  //   }
  // }

  async deleteTransaction(userId: string, transactionId: string) {
    try {
      const result = await this.userModel.findByIdAndUpdate(
        userId,
        { $pull: { transactions: { _id: transactionId } } },
        { new: true },
      );

      if (!result) {
        throw new Error('User not found');
      }

      return { message: 'Transaction deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting transaction: ' + error.message);
    }
  }
}
