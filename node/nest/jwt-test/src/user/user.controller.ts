import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserService } from './user.service';
import { AuthService } from '../logical/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt')) // 使用jwt进行路由验证
  @Post('/register')
  async register(
    @Body('username') username: string,
    @Body('passwd') passwd: string,
    @Body('verifypasswd') verifypasswd: string,
    @Res() res: Response,
  ) {
    try {
      await this.userService.createUser(username, passwd, verifypasswd);
      res.status(200);
      res.send({
        success: true,
        message: '用户创建成功',
      });
    } catch (error) {
      res.status(400);
      res.send({
        success: false,
        message: error.message || '网络异常',
      });
    }
  }

  @Post('/login')
  async login(@Body() loginParmas: any) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParmas.username,
      loginParmas.passwd,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }
}
