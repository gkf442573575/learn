import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dots/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  async create(@Body() createUserDto: CreateUserDto) {
    let user = await this.userService.getuserByname(createUserDto.username);
    if (user) {
      return { code: 200, success: false, message: '用户已存在' };
    } else {
      await this.userService.createUser(createUserDto);
      return { code: 200, success: true, message: '新增成功' };
    }
  }
}
