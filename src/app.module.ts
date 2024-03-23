// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/controller/users.controller';
import { UsersService } from './users/service/users.service';
import { UserSchema } from './users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/waizly'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
