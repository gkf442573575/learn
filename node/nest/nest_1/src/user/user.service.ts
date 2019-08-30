import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // 创建用户
  async createUser(user: User) {
    return this.userRepo.save(user);
  }
  // 通过username获取用户
  async getuserByname(username): Promise<User> {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }
}
