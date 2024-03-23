// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(name: string, email: string): Promise<User> {
    const newUser = new this.userModel({ name, email });
    const createdUser = await newUser.save();
    return createdUser.toObject({ versionKey: false });
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUserById(userId: string): Promise<User> {
    return await this.userModel.findById(userId).exec();
  }

  async updateUser(userId: string, name: string, email: string): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userId, { name, email }, { new: true }).exec();
  }

  async deleteUser(userId: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(userId).exec();
  }
}
