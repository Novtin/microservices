import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './user.repository';
import { RedisModule } from '../../config/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    DatabaseModule,
    RedisModule,
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
