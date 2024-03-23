// users.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../model/user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body('name') userName: string, @Body('email') userEmail: string): Promise<User> {
    const createdUser = await this.usersService.createUser(userName, userEmail);
    return createdUser;
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<User> {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('name') userName: string,
    @Body('email') userEmail: string,
  ): Promise<User> {
    const updatedUser = await this.usersService.updateUser(userId, userName, userEmail);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<User> {
    const deletedUser = await this.usersService.deleteUser(userId);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}
