import {Resolver, Arg, Mutation} from 'type-graphql';
import {service} from '@loopback/core';
import {UserRepository} from '../repositories';
import {User} from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @service(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @Mutation(returns => String)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<string> {
    const user = await this.userRepository.findOne({where: {email}});
    if (!user) {
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      {userId: user.id, role: user.role},
      process.env.SECRET_KEY, // 在生产环境中请使用环境变量来存储密钥
      {expiresIn: '7d'},
    );

    return token;
  }
}
