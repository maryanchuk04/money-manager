import * as mongoose from 'mongoose';

export enum TransactionType {
  EXPENSE = 'Витрата',
  INCOME = 'Надходження',
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: TransactionType;
  tag: string;
}

export interface Tag {
  id: string;
  tagName: string;
  type: TransactionType;
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
        id: { type: String, required: true },
        date: { type: Date, required: true },
        amount: { type: Number, required: true },
        type: {
          type: String,
          enum: Object.values(TransactionType),
          required: true,
        },
        tag: { type: String, required: true },
      },
    ],
    tags: [
      {
        id: { type: String, required: true },
        tagName: { type: String, required: true },
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
  tags: Tag[];
}
