import * as mongoose from 'mongoose';

export enum TransactionType {
  EXPENSE = 'Витрата',
  INCOME = 'Надходження',
}

export interface Transaction {
  _id?: string;
  date: Date;
  amount: number;
  type: TransactionType;
  description: string;
}

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    transactions: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: mongoose.Types.ObjectId,
        },
        date: { type: Date, required: true },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
        type: {
          type: String,
          enum: Object.values(TransactionType),
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  transactions: Transaction[];
}
