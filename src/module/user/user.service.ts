import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as crypto from 'node:crypto';
import * as argon from 'argon2';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { UserDto } from './dto/user.dto';
import { SignInDto } from './dto/sign-in.dto';
import Redis from 'ioredis';
import { REDIS_TOKEN } from '../../config/redis/redis.constant';

@Injectable()
export class UserService {
  constructor(
    @Inject(REDIS_TOKEN) private readonly redis: Redis,
    private readonly userRepository: UserRepository,
  ) {}
  async create(user: CreateUserDto): Promise<void> {
    const userExist = await this.userRepository.checkExistUser({
      phone: user.phone,
      login: user.login,
    });
    if (!!userExist) {
      throw new ConflictException('User already exist');
    }
    const salt = crypto.randomBytes(32);
    const hash = await argon.hash(user.password, { salt });

    await this.userRepository.createUser({
      passwordHash: hash,
      passwordSalt: salt.toString('hex'),
      ...user,
    });
  }

  async findAll(
    getUserFilterDto: GetUserFilterDto,
  ): Promise<{ items: UserDto[]; total: number }> {
    const { items: users, total } =
      await this.userRepository.findAndCount(getUserFilterDto);
    const dtos = users.map((user) => new UserDto(user));
    return { items: dtos, total };
  }

  async findByLogin(login: string) {
    return { items: [await this.userRepository.findByLogin(login)], total: 1 };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser({ userId: id, ...updateUserDto });
  }

  async remove(id: string) {
    const user = await this.userRepository.findById(id);
    if (user) {
      await this.redis.del(user.login);
    }
    return this.userRepository.deleteUser(id);
  }

  async verification(signInDto: SignInDto): Promise<boolean> {
    const user = await this.userRepository.findByLogin(signInDto.login);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return argon.verify(user.passwordHash, signInDto.password);
  }
}
