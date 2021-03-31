import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { makeSalt, encryptPassword } from '../utils/cryptogram';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      try {
        const user = await this.userRepo.findOne({
          where: {
            username: username,
          },
        });
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createUser(
    username: string,
    passwd: string,
    verifypasswd: string,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (passwd !== verifypasswd) {
          reject(new Error('两次密码不一致'));
        }
        const user = await this.userRepo.findOne({
          where: {
            username: username,
          },
        });
        if (user) {
          reject(new Error('用户名已存在，请重新输入'));
        }
        const salt = makeSalt(); // 制作密码盐
        const hashPwd = encryptPassword(passwd, salt); // 加密密码
        // 插入一个用户
        await this.userRepo
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            username,
            salt,
            passwd: hashPwd,
          })
          .execute();
        resolve('创建成功');
      } catch (error) {
        reject(error);
      }
    });
  }
}
