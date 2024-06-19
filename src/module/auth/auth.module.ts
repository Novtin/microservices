import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { InternalAccountModule } from '../../internal/account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '../../config/redis/redis.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [InternalAccountModule, JwtModule, ConfigModule, RedisModule],
})
export class AuthModule {}
